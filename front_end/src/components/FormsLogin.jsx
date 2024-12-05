import React, { useState } from 'react';
import axios from 'axios'
import styles from './FormsUser.module.css';

function FormsLogin({ formData, setFormData }) {
    const [message, setMessage] = useState('');

    const api = axios.create({
        baseURL: '/usuarios', // Usa o proxy configurado no package.json
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault(); // Evita o envio do formulário padrão
        
        try {
            const response = await api.post('/auth/register',formData)

            // Checando se a resposta foi bem-sucedida
            if (response.ok) {
                const data = await response.json();
                setMessage('Usuário logado com sucesso!');
                setFormData({
                    email: '',
                    senha: '',
                });
            } else {
                // Caso a resposta não seja ok, extraímos a mensagem de erro
                const errorData = await response.json();
                setMessage(errorData.message || 'Erro no login. Verifique os dados!');
            }
        } catch (error) {
            // Em caso de erro na requisição ou rede, exibimos a mensagem de erro
            console.error('Erro ao fazer a requisição:', error);
            setMessage(`Erro: ${error.stack || error.message}`);
        }
    };
    
    return (
        <div className={styles.formContainer}>
            <h2>Cadastro de Usuários</h2>
            {message && <p>{message}</p>}
            <form onSubmit={handleSubmit}>
                <div className="inputGroup">
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="inputGroup">
                    <label htmlFor="senha">Senha:</label>
                    <input
                        type="password"
                        id="senha"
                        name="senha"
                        value={formData.senha}
                        onChange={handleChange}
                        required
                    />
                </div>

                <button type="submit">Entrar</button>
            </form>
        </div>
    );
}

export default FormsLogin;
