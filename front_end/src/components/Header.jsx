import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './Header.module.css'; // Importando o CSS
import logo from '../images/logo.jpg'; // Importando a logo
import Icons from './icons/Icons';
import axios from "axios";

async function validateAdmin() {
  const token = localStorage.getItem("token");
  try {
    const response = await axios.get("http://localhost:8080/usuarios/auth/validate-admin", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return true;
  } catch (error) {
    console.error("Erro ao validar admin:", error.response?.data || error.message);
    return false;
  }
}

function Header({login}){
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    async function checkAdmin() {
      const isAdminUser = await validateAdmin();
      setIsAdmin(isAdminUser);
    }
    checkAdmin();
  }, []);

  if(login){
    return null;
  }
  else if (isAdmin === true){ 
    return (
    <header className={styles.headerContainer}>
      <img src={logo} alt="Logo Meninas Digitais" className={styles.logo} />
      <div className={styles.containerOpcoes}>
        <nav>
          <ul>
            <li><Link to="/cadastro">Usuarios Cadastro</Link></li>
            <li><Link to="/lista">Usuarios Lista</Link></li>
            <li><Link to="/atividades">Atividades Cadastro</Link></li>
            <li><Link to="/atividades/lista">Atividades Lista</Link></li>
            <a href="/auth/me">
              <Icons.AVATAR/>
           </a>
          </ul>
        </nav>
      </div>
    </header>
  );
}
  else{
    return(
    <header className={styles.headerContainer}>
      <img src={logo} alt="Logo Meninas Digitais" className={styles.logo} />
      <div className={styles.containerOpcoes}>
        <a href="/auth/me">
          <Icons.AVATAR/>
        </a>
      </div>
    </header>)
  }
}

export default Header;
