import React, { useState, useEffect } from "react";
import styles from "./UserProfile.module.css";
import Icons from "./icons/Icons";
import { Button, TextField } from "@mui/material";
import axios from "axios";

const UserProfile = () => {
  const [userData, setUserData] = useState({
    nome: "",
    email: "",
    funcao: "",
    setor: "",
    dataEntrada: "",
    dataSaida: "Não especificada",
    permissao: "",
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsuarioPerfil = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:8080/usuarios/auth/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
        
        setUserData(response.data);
      } catch (err) {
        setError("Erro ao carregar dados do usuário: " + err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUsuarioPerfil();
  }, []);

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };
  
  if (loading) return <p>Carregando...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div className={styles.container}>
      <h2>Meu Perfil</h2>
      <div className={styles.profileContainer}>
        <div className={styles.avatar}>
          <Icons.AVATAR />
        </div>
        <div className={styles.form}>
          <TextField label="Login*" value={userData.email} fullWidth disabled />
          <TextField label="Nome*" name="nome" value={userData.nome} onChange={handleChange} fullWidth disabled/>
          <TextField label="Função" name="funcao" value={userData.funcao} onChange={handleChange} fullWidth disabled/>
          <TextField label="Setor" name="setor" value={userData.setor} onChange={handleChange} fullWidth disabled/>
          <TextField label="Data de Entrada" name="dataEntrada" value={userData.dataEntrada} onChange={handleChange} fullWidth disabled/>
          <TextField label="Data de Saída" name="dataSaida" value={userData.dataSaida} fullWidth disabled />
          <TextField label="Permissão" name="permissao" value={userData.permissao} fullWidth disabled />
          <Button 
        variant="contained" 
        color="primary" 
        href="/atividades/user/me"
        className={styles.viewActivitiesButton}
      >
        Ver Atividades
      </Button>
        </div>
        {/* Botão para navegar para a página de atividades */}
      
      </div>
    </div>
  );
};

export default UserProfile;
