import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";

// Importar componentes
import CriarUsuarios from "./pages/criarUsuarios.jsx";
import LogarUsuarios from "./pages/logarUsuarios.jsx";

function App(){

  // Estado para o formulário
  const [formCadastro, setForm] = useState({
    id: "",
    nome: "",
    funcao: "",
    setor: "",
    dataEntrada: "",
    dataSaida: "",
    permissao: "",
    email: "",
    senha: "",
  });

  const [formLogin, setFormLogin] = useState({
    email: "",
    senha: "",
  });

  return (
    <Router>
      <Routes>
        {/* Rota para criar usuários */}
        <Route path="/" element={<CriarUsuarios formData={formCadastro} setFormData={setForm}/>} />

        {/* Rota para criar usuários */}
        <Route path="/login" element={<LogarUsuarios formData={formLogin} setFormData={setFormLogin}/>}/>
      </Routes>
    </Router>
  );
}

export default App;
