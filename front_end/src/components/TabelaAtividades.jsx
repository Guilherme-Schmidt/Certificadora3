import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from './TabelaUsuarios.module.css'; // Importando o CSS

function TabelaAtividades() {
  const [atividades, setAtividades] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Função para buscar as atividades
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
      setError("Erro ao carregar atividades: " + err.message); // Alterado para err.message
    } finally {
      setLoading(false);
    }
  };

  // Usar useEffect para carregar as atividades uma vez quando o componente for montado
  useEffect(() => {
    fetchAtividades();
  }, []); // O array vazio garante que a função execute apenas uma vez, após a montagem

  if (loading) {
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
              <td>{atividade.nome}</td> {/* Corrigido para acessar o nome da atividade */}
              <td>{atividade.descricao}</td>
              <td>{atividade.horas}</td>
              <td>{atividade.data}</td>
              <td>{atividade.usuario ? atividade.usuario.nome : "N/A"}</td> {/* Acessando o nome do usuário */}
              <td>{atividade.grupo}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TabelaAtividades;
