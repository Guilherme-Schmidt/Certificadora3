import React, { useEffect, useState } from 'react';
import {jwtDecode} from 'jwt-decode'; // Corrigido o nome da importação de jwtDecode para jwtDecode
import { Link } from 'react-router-dom';
import styles from './Header.module.css'; // Importando o CSS
import logo from '../images/logo.jpg'; // Importando a logo

function Header() {
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    // Verificar se o token está presente no armazenamento local
    const token = localStorage.getItem('token');
    
    if (token) {
      try {
        // Decodificar o token para obter as informações
        const decodedToken = jwtDecode(token);

        // Verificar se o usuário é um admin
        if (decodedToken.role === 'admin') {
          setIsAdmin(true);
        }
      } catch (error) {
        console.error('Erro ao decodificar o token:', error);
      }
    }
  }, []);

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
          </ul>
        </nav>
        <a href="/login">
          <button>Entrar</button>
        </a>
      </div>
    </header>
  );
}

export default Header;
