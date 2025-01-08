import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./TabelaUsuarios.module.css";

function TabelaAtividadesUsuario() {
  const [atividades, setAtividades] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchAtividades = async () => {
    try {
      const token = localStorage.getItem("token"); // Recupera o token
      const response = await axios.get(`http://localhost:8080/atividades/user/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      // Verifique se a resposta é um array
      if (Array.isArray(response.data)) {
        setAtividades(response.data);
      } else {
        setAtividades([]); 
      }
    } catch (err) {
      setError("Erro ao carregar atividades: " + err.message);
      setAtividades([]); // Garante que o estado seja um array
    } finally {
      setLoading(false);
    }
  };
  

  useEffect(() => {
    fetchAtividades();
  }, []);

  if (loading) {
    return <p>Carregando...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className={styles.containerTabela}>
      <h1 className={styles.titulo}>Atividades do Usuário</h1>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Descrição</th>
            <th>Horas</th>
            <th>Data</th>
          </tr>
        </thead>
        <tbody>
          {atividades.map((atividade) => (
            <tr key={atividade.id}>
              <td>{atividade.nome}</td>
              <td>{atividade.descricao}</td>
              <td>{atividade.horas}</td>
              <td>{atividade.data}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TabelaAtividadesUsuario;
