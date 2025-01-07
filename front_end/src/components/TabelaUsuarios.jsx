import React, { useState } from "react";
import Button from '@mui/material/Button'; // Importação do botão
import axios from "axios";
import styles from './TabelaUsuarios.module.css'; // Importando o CSS
import Icons from './icons/Icons';

function TabelaUsuarios() {
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Carregar os usuários antes da renderização
  const fetchUsuarios = async () => {
    try {
        const token = localStorage.getItem("token"); // Recupera o token do armazenamento local

        const response = await axios.get("http://localhost:8080/usuarios/lista", {
          headers: {
            Authorization: `Bearer ${token}`, // Adiciona o token no cabeçalho
          },
        });
      setUsuarios(response.data); // Atualiza o estado com os dados
    } catch (err) {
      setError("Erro ao carregar usuários: " + err.stack);
    } finally {
      setLoading(false);
    }
  };

  const deleteUsuario = async (usuarioId) => {
    try {
      const token = localStorage.getItem("token"); // Recupera o token do armazenamento local
  
      // Envia a requisição de deleção para o backend
      await axios.delete(`http://localhost:8080/usuarios/${usuarioId}`, {
        headers: {
          Authorization: `Bearer ${token}`, // Adiciona o token no cabeçalho
        },
      });
  
      // Após excluir o usuário, atualiza a lista de usuários
      setUsuarios((prevUsuarios) =>
        prevUsuarios.filter((usuario) => usuario.id !== usuarioId)
      );
    } catch (err) {
      setError("Erro ao excluir usuário: " + err.stack);
    } finally {
      setLoading(false);
    }
  };

  // Chama a função de busca imediatamente
  if (loading) {
    fetchUsuarios();
    return <p>Carregando...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className={styles.containerTabela}>
      <h1 className={styles.titulo}>Lista de Usuários</h1>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Ação</th>
            <th>ID</th>
            <th>Nome</th>
            <th>Função</th>
            <th>Setor</th>
            <th>Data de Entrada</th>
            <th>Data de Saída</th>
            <th>Permissão</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.map((usuario, index) => (
            <tr key={index}>
              <td className={styles.buttonContainer}>
                <Button startIcon={<Icons.DELETE />} onClick={() => deleteUsuario(usuario.id)} size="small"></Button>
                <Button startIcon={<Icons.EDIT />}></Button>
              </td>
              <td>{usuario.id}</td>
              <td>{usuario.nome}</td>
              <td>{usuario.funcao}</td>
              <td>{usuario.setor}</td>
              <td>{usuario.dataEntrada}</td>
              <td>{usuario.dataSaida || "Não especificada"}</td>
              <td>{usuario.permissao}</td>
              <td>{usuario.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TabelaUsuarios;
