import React from 'react';
import styles from './Header.module.css';
import logo from '../images/logo.jpg'

function Header() {
    return (
        <header className={styles.headerContainer}>
            <img src={logo} alt="Logo Meninas Digitais"/>
            <div className={styles.containerOpcoes}>
                <nav>
                    <ul>
                        <li><a href="/usuarios">Usuários</a></li>
                        <li><a href="/atividades">Atividades</a></li>
                    </ul>
                    
                </nav>
                <button>Entrar</button>
            </div>
        </header>
    );
}


export default Header;
