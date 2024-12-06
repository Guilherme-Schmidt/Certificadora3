import React, { useState } from 'react';
import axios from 'axios';
import styles from './FormsUser.module.css';

function FormsLogin({ formData, setFormData }) {
    const [message, setMessage] = useState('');
    const [token, setToken] = useState('');
    
    const api = axios.create({
        baseURL: '/usuarios', // Usa o proxy configurado no package.json
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            const response = await api.post('/auth/login', formData); // Mudança para /auth/login

            if (response.status === 200) {
                // Supondo que o token venha no corpo da resposta
                const { token } = response.data; // Ajuste conforme a resposta da API

                // Salvar o token no localStorage
                localStorage.setItem('token', response.data.token);
                setToken(token);

                setMessage('Usuário logado com sucesso!');
                setFormData({ email: '', senha: '' });
                
            } else {
                setMessage('Erro no login. Verifique os dados!');
            }
        } catch (error) {
            console.error('Erro ao fazer a requisição:', error);
            setMessage(`Erro: ${error.stack || error.message}`);
        }
    };
    
    return (
        <div className={styles.formContainer}>
            <h2>Login de Usuário</h2>
            {token && <p>Token JWT: {token}</p>}  {/* Exibe o token JWT */}
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
