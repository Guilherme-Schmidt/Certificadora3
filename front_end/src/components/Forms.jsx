import React,{useState} from 'react';
import styles from './Forms.module.css';

function Forms() {
    const [formData, setFormData] = useState({
        nome: "",
        funcao: "",
        setor: "",
        dataEntrada: "",
        email: "", 
        tipo: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Aqui você pode processar o envio do formulário, como fazer um POST para uma API
        console.log(formData);
    };

    return (
        <div className={styles.formContainer}>
            <h2>Cadastro de Usuários</h2>
            <form>
                <div className="inputGroup">
                    <label htmlFor="nome">Nome:</label>
                    <input type="text" id="nome" name="nome" />
                </div>

                <div className="inputGroup">
                    <label htmlFor="funcao">Função:</label>
                    <input type="text" id="funcao" name="funcao" />
                </div>

                <div className="inputGroup">
                    <label htmlFor="setor">Setor:</label>
                    <input type="text" id="setor" name="setor" />
                </div>

                <div className="inputGroup">
                    <label htmlFor="entrada">Data de Entrada:</label>
                    <input type="text" id="entrada" name="entrada" placeholder="DD/MM/AAAA" />
                </div>

                <div className="inputGroup">
                    <label htmlFor="email">Email:</label>
                    <input type="email" id="email" name="email" />
                </div>

                <div className="inputGroup">
                    <label htmlFor="tipo">Tipo:</label>
                    <input type="text" id="tipo" name="tipo" />
                </div>

                <button type="submit">Cadastrar</button>
            </form>
        </div>
    );
}

export default Forms;
