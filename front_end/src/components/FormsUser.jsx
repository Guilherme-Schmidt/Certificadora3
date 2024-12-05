import React, { useState } from 'react';
import axios from 'axios'
import styles from './FormsUser.module.css';

function FormsUser({ formData, setFormData }) {
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
        if (formData.senha.length < 6) {
            setMessage('A senha precisa ter pelo menos 6 caracteres.');
            return;
        }
        
        if (formData.dataEntrada) {
            const parts = formData.dataEntrada.split('-'); // Divide pelo "-"
            if (parts.length === 3) {
                const [year, day, month] = parts; // Extrai partes corretamente
                formData.dataEntrada = `${year}-${month}-${day}`; // Reordena no formato esperado
            } else {
                console.error('Formato de data inválido. Certifique-se de usar AAAA/DD/MM.');
            }
        }
    
        const dataToSend = { ...formData };
        delete dataToSend.id; // Remove o id (caso tenha) para enviar os dados corretos
    
        console.log("Dados enviados:", dataToSend); // Verifique os dados
    
        try {
            const response = await axios.post('http://localhost:8080/usuarios/auth/register', dataToSend, {
                headers: {
                    'Content-Type': 'application/json' // Garante que o backend entenda o formato JSON
                }
            });
    
            // Checando se a resposta foi bem-sucedida
            if (response.status === 200) {
                setMessage('Usuário cadastrado com sucesso!');
                // Se necessário, trate a resposta com sucesso aqui
            } else {
                // Caso a resposta não seja ok, extraímos a mensagem de erro
                setMessage(response.data.message || 'Erro no cadastro. Verifique os dados!');
            }
        } catch (error) {
            // Em caso de erro na requisição ou rede, exibimos a mensagem de erro
            console.error('Erro ao fazer a requisição:', error);
            setMessage(`Erro: ${error.response ? error.response.data : error.message}`);
        }
    };
    
    
    return (
        <div className={styles.formContainer}>
            <h2>Cadastro de Usuários</h2>
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
                    <label htmlFor="permissao">Tipo:</label>
                    <input
                        type="text"
                        id="permissao"
                        name="permissao"
                        value={formData.permissao}
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
                        value={formData.funcao}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="inputGroup">
                    <label htmlFor="setor">Setor:</label>
                    <input
                        type="text"
                        id="setor"
                        name="setor"
                        value={formData.setor}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="inputGroup">
                    <label htmlFor="dataEntrada">Data de Entrada:</label>
                    <input
                        type="date"
                        id="dataEntrada"
                        name="dataEntrada"
                        placeholder="YYYY-MM-DD"
                        value={formData.dataEntrada}
                        onChange={handleChange}
                        required
                    />
                </div>

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

                <button type="submit">Cadastrar</button>
            </form>
        </div>
    );
}

export default FormsUser;
