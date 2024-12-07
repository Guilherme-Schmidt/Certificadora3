import React, { useState } from 'react';
import axios from 'axios';
import styles from './FormsUser.module.css';

function FormsCadastroAtividade({ formData, setFormData }) {
    const [message, setMessage] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name === "horas" && value) {
            // Converte HH:mm para ISO-8601 Duration
            const [hours, minutes] = value.split(":").map(Number);
            const duration = `PT${hours}H${minutes}M`;
            setFormData({ ...formData, horas: duration });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem("token"); // Recupera o token do localStorage

        const dataToSend = { ...formData };
        delete dataToSend.id; // Remove ID, se necessário

        console.log("Dados enviados:", dataToSend);

        try {
            const response = await axios.post('http://localhost:8080/atividades', dataToSend, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });

            if (response.status === 201) { // Status CREATED
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
                    <label htmlFor="Descricao">Descricao:</label>
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
                    <label htmlFor="usuario">Usuario:</label>
                    <input
                        type="number"
                        id="usuario"
                        name="usuario"
                        value={formData.usuario}
                        onChange={handleChange}
                        required
                    />
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
