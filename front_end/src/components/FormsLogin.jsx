import React, { useState } from 'react';
import axios from 'axios';
import styles from './FormsUser.module.css';
import { useNavigate } from 'react-router-dom';

function FormsLogin({ formData, setFormData }) {
    const [message, setMessage] = useState('');
    const [token, setToken] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const [userName, setUserName] = useState('');
    const navigate = useNavigate(); // Hook para navegação

    const api = axios.create({
        baseURL: 'http://localhost:8080/usuarios',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await api.post('/auth/login', formData);

            if (response.status === 200) {
                const { token, nome } = response.data; 
                localStorage.setItem('token', token);
                setToken(token);
                setUserName(nome);
                setMessage('Usuário logado com sucesso!');
                setFormData({ email: '', senha: '' });

                // Exibir o modal de boas-vindas
                setModalVisible(true);
            } else {
                setMessage('Erro no login. Verifique os dados!');
            }
        } catch (error) {
            console.error('Erro ao fazer a requisição:', error);
            setMessage(`Erro: ${error.stack || error.message}`);
        }
    };

    const closeModal = () => {
        setModalVisible(false);
        navigate('/lista'); // Redireciona para a página desejada
    };

    return (
        <div className={styles.formContainer}>
            <h2>Login de Usuário</h2>
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

            {modalVisible && (
                <div className={styles.modalOverlay}>
                    <div className={styles.modal}>
                        <h3>Bem-vindo, {userName}!</h3>
                        <p>Você realizou o login com sucesso.</p>
                        <button onClick={closeModal}>Fechar</button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default FormsLogin;
