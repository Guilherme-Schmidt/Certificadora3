import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Select from 'react-select';
import styles from './FormsUser.module.css';

function FormsCadastroAtividade({ formData, setFormData }) {
    const [message, setMessage] = useState('');
    const [usuarios, setUsuarios] = useState([]);

    useEffect(() => {
        const fetchUsuarios = async () => {
            const token = localStorage.getItem("token");

            if (!token) {
                setMessage('Token de autenticação não encontrado. Faça login novamente.');
                return;
            }

            try {
                const response = await axios.get('http://localhost:8080/usuarios/lista', {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setUsuarios(response.data);
            } catch (error) {
                console.error('Erro ao buscar usuários:', error);
                setMessage(error.response?.data?.message || 'Erro ao carregar usuários');
            }
        };

        fetchUsuarios();
    }, []);

    const handleChange = (e) => {
        const { name, value, type } = e.target;

        if (name === 'usuario' && type === 'select-multiple') {
            const selectedOptions = Array.from(e.target.selectedOptions, option => parseInt(option.value, 10));
            setFormData({ ...formData, usuario: selectedOptions });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleSelectChange = (selectedOptions) => {
        const selectedUserIds = selectedOptions ? selectedOptions.map(option => option.value) : [];
        setFormData({ ...formData, usuario: selectedUserIds });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem("token");
    
        if (!token) {
            setMessage('Token de autenticação não encontrado. Faça login novamente.');
            return;
        }
    
        // Envia uma atividade para cada usuário selecionado
        for (const userId of formData.usuario) {
            const dataToSend = {
                ...formData,
                usuario: userId,  // Envia um usuário por vez (não um array)
            };
    
            console.log("Dados enviados:", dataToSend);
    
            try {
                const response = await axios.post('http://localhost:8080/atividades', dataToSend, {
                    headers: { Authorization: `Bearer ${token}` },
                });
    
                if (response.status === 201) {
                    setMessage('Atividade cadastrada com sucesso!');
                } else {
                    setMessage(response.data.message || 'Erro no cadastro. Verifique os dados!');
                }
            } catch (error) {
                console.error('Erro ao fazer a requisição:', error);
                setMessage(`Erro: ${error.response?.data || error.message}`);
            }
        }
    
        // Limpa os dados após o envio
        setFormData({ id: "", nome: "", descricao: "", horas: "", data: "", usuario: [], grupo: "" });
    };

    const userOptions = usuarios.map(usuario => ({
        label: `${usuario.nome} (ID: ${usuario.id})`,
        value: usuario.id,
    }));

    return (
        <div className={styles.formContainer}>
            <h2>Cadastro de Atividades:</h2>
            {message && <p>{message}</p>}
            <form onSubmit={handleSubmit}>
                <div className="inputGroup">
                    <label htmlFor="nome">Nome:</label>
                    <input type="text" id="nome" name="nome" value={formData.nome} onChange={handleChange} required />
                </div>

                <div className="inputGroup">
                    <label htmlFor="descricao">Descrição:</label>
                    <input type="text" id="descricao" name="descricao" value={formData.descricao} onChange={handleChange} required />
                </div>

                <div className="inputGroup">
                    <label htmlFor="horas">Horas:</label>
                    <input id="horas" type="time" name="horas" onChange={handleChange} value={formData.horas} />
                </div>

                <div className="inputGroup">
                    <label htmlFor="data">Data:</label>
                    <input type="date" id="data" name="data" value={formData.data} onChange={handleChange} required />
                </div>

                <div className="inputGroup">
                    <label>Usuários:</label>
                    <Select
                        isMulti
                        name="usuarios"
                        options={userOptions}
                        value={userOptions.filter(option => formData.usuario.includes(option.value))}
                        onChange={handleSelectChange}
                        className="basic-multi-select"
                        classNamePrefix="select"
                    />
                </div>

                <div className="inputGroup">
                    <label htmlFor="grupo">Grupo:</label>
                        <select
                            id="grupo"
                            name="grupo"
                            value={formData.grupo}
                            onChange={handleChange}
                            required
                        ><option value="">Selecione um grupo</option>
                        <option value="Analise">Análise</option>
                        <option value="Planejamento">Planejamento</option>
                        <option value="Execução">Execução</option>
                        </select>
                </div>

                <button type="submit">Cadastrar</button>
            </form>
        </div>
    );
}

export default FormsCadastroAtividade;
