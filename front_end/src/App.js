import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";

// Importar componentes
import CriarUsuarios from "./pages/criarUsuarios.jsx";

function App(){

  // Estado para o formulário
  const [form, setForm] = useState({
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

  return (
    <Router>
      <Routes>
        {/* Rota para criar usuários */}
        <Route path="/" element={<CriarUsuarios formData={form} setFormData={setForm}/>} />
      </Routes>
    </Router>
  );
}

export default App;
