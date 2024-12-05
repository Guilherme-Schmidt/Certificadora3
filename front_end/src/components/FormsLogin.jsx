import React, { useState } from 'react';
import styles from './FormsUser.module.css';

function Forms({ formData, setFormData }) {
    const [message, setMessage] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault(); // Evita o envio do formulário padrão
        
        // Validação simples no frontend (por exemplo, verificar formato do email)
        if (!formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
            setMessage('Por favor, insira um email válido.');
            return;
        }

        try {
            const response = await fetch('http://localhost:8080/usuarios/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            // Checando se a resposta foi bem-sucedida
            if (response.ok) {
                const data = await response.json();
                setMessage('Usuário cadastrado com sucesso!');
                setFormData({
                    nome: '',
                    funcao: '',
                    setor: '',
                    dataEntrada: '',
                    email: '',
                    senha: '',
                });
            } else {
                // Caso a resposta não seja ok, extraímos a mensagem de erro
                const errorData = await response.json();
                setMessage(errorData.message || 'Erro no cadastro. Verifique os dados!');
            }
        } catch (error) {
            // Em caso de erro na requisição ou rede, exibimos a mensagem de erro
            console.error('Erro ao fazer a requisição:', error);
            setMessage(`Erro: ${error.stack || error.message}`);
        }
    };
    
    return (
        <div className={styles.formContainer}>
            <h2>Login</h2>
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
                    <label htmlFor="tipo">Nome:</label>
                    <input
                        type="text"
                        id="permissao"
                        name="permissao"
                        value={formData.nome}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="inputGroup">
                    <label htmlFor="funcao">Função:</label>
                    <input
                        type="text"
                        id="funcao"
                        name="funcao"
                        value={formData.permissao}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit">Entrar</button>
            </form>
        </div>
    );
}

export default Forms;
