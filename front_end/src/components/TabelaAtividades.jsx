import React, { useState } from "react";
import axios from "axios";
import styles from './TabelaUsuarios.module.css'; // Importando o CSS

function TabelaAtividades() {
  const [atividades, setAtividades] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Carregar os usuários antes da renderização
  const fetchAtividades = async () => {
    try {
        const token = localStorage.getItem("token"); // Recupera o token do armazenamento local

        const response = await axios.get("http://localhost:8080/atividades", {
          headers: {
            Authorization: `Bearer ${token}`, // Adiciona o token no cabeçalho
          },
        });
        setAtividades(response.data); // Atualiza o estado com os dados
    } catch (err) {
      setError("Erro ao carregar usuários: " + err.stack);
    } finally {
      setLoading(false);
    }
  };

  // Chama a função de busca imediatamente
  if (loading) {
    fetchAtividades();
    return <p>Carregando...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className={styles.containerTabela}>
      <h1 className={styles.titulo}>Lista de Atividades</h1>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Função</th>
            <th>Descrição</th>
            <th>Horas</th>
            <th>Data de Saída</th>
            <th>Usuário</th>
            <th>Grupo</th>
          </tr>
        </thead>
        <tbody>
          {atividades.map((atividade, index) => (
            <tr key={index}>
              <td>{atividade.id}</td>
              <td>{atividade.nome}</td>
              <td>{atividade.descricao}</td>
              <td>{atividade.horas}</td>
              <td>{atividade.data}</td>
              <td>{atividade.usuario}</td>
              <td>{atividade.grupo}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TabelaAtividades;
