import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './FormsUser.module.css';

function FormsCadastroAtividade({ formData, setFormData }) {
    const [message, setMessage] = useState('');
    const [usuarios, setUsuarios] = useState([]); // Novo estado para armazenar os usuários

    useEffect(() => {
        const fetchUsuarios = async () => {
            const token = localStorage.getItem("token"); // Recupera o token do localStorage

            if (!token) {
                setMessage('Token de autenticação não encontrado. Faça login novamente.');
                return;
            }

            try {
                const response = await axios.get('http://localhost:8080/usuarios/lista', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setUsuarios(response.data); // Armazena a lista de usuários
            } catch (error) {
                console.error('Erro ao buscar usuários:', error);
                if (error.response) {
                    // Mensagem personalizada baseada no código de erro
                    if (error.response.status === 403) {
                        setMessage('Acesso negado. Seu token pode ser inválido ou expirado.');
                    } else if (error.response.status === 401) {
                        setMessage('Não autorizado. Verifique suas credenciais.');
                    } else {
                        setMessage(`Erro ao carregar usuários: ${error.response.data.message || 'Erro desconhecido'}`);
                    }
                } else {
                    setMessage('Erro ao conectar ao servidor. Verifique sua conexão.');
                }
            }
        };

        fetchUsuarios();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem("token");

        if (!token) {
            setMessage('Token de autenticação não encontrado. Faça login novamente.');
            return;
        }

        const dataToSend = { ...formData };
        dataToSend.usuario = parseInt(formData.usuario, 10);

        console.log("Dados enviados:", dataToSend);

        try {
            const response = await axios.post('http://localhost:8080/atividades', dataToSend, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (response.status === 201) {
                setMessage('Atividade cadastrada com sucesso!');
                setFormData({
                    id: "",
                    nome: "",
                    descricao: "",
                    horas: "",
                    data: "",
                    usuario: "",
                    grupo: "",
                });
            } else {
                setMessage(response.data.message || 'Erro no cadastro. Verifique os dados!');
            }
        } catch (error) {
            console.error('Erro ao fazer a requisição:', error);
            setMessage(`Erro: ${error.response ? error.response.data : error.message}`);
        }
    };

    return (
        <div className={styles.formContainer}>
            <h2>Cadastro de Atividades:</h2>
            {message && <p>{message}</p>}
            <form onSubmit={handleSubmit}>
                <div className="inputGroup">
                    <label htmlFor="nome">Nome:</label>
                    <input
                        type="text"
                        id="nome"
                        name="nome"
                        value={formData.nome}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="inputGroup">
                    <label htmlFor="descricao">Descrição:</label>
                    <input
                        type="text"
                        id="descricao"
                        name="descricao"
                        value={formData.descricao}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="inputGroup">
                    <label htmlFor="horas">Horas:</label>
                    <input
                        id="horas"
                        type="time"
                        name="horas"
                        onChange={handleChange}
                        value={formData.horas.replace(/PT(\d+)H(\d+)M/, (match, h, m) => `${h.padStart(2, '0')}:${m.padStart(2, '0')}`) || ""}
                    />
                </div>

                <div className="inputGroup">
                    <label htmlFor="data">Data:</label>
                    <input
                        type="date"
                        id="data"
                        name="data"
                        value={formData.data}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="inputGroup">
                    <label htmlFor="usuario">Usuário:</label>
                    <select
                        id="usuario"
                        name="usuario"
                        value={formData.usuario}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Selecione um usuário</option>
                        {usuarios.map((usuario) => (
                            <option key={usuario.id} value={usuario.id}>
                                {usuario.nome} (ID: {usuario.id})
                            </option>
                        ))}
                    </select>
                </div>

                <div className="inputGroup">
                    <label htmlFor="grupo">Grupo:</label>
                    <input
                        type="text"
                        id="grupo"
                        name="grupo"
                        value={formData.grupo}
                        onChange={handleChange}
                        required
                    />
                </div>

                <button type="submit">Cadastrar</button>
            </form>
        </div>
    );
}

export default FormsCadastroAtividade;
