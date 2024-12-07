import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import ProtectedRoutes from "./routes/ProtectedRoutes.jsx";

// Importar componentes
import CriarUsuarios from "./pages/criarUsuarios.jsx";
import CriarAtividades from "./pages/criarAtividades.jsx";
import ListarAtividades from "./pages/listarAtividades.jsx";
import LogarUsuarios from "./pages/logarUsuarios.jsx";
import ListarUsuarios from "./pages/listarUsuarios.jsx";

import AcessoNegado from "./pages/acessoNegado.jsx";



function App() {
  // Estado para o formulário de cadastro
  const [formCadastro, setFormCadastro] = useState({
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

  const [formAtividade, setFormsAtividade] = useState({
    id: "",
    nome: "",
    descricao: "",
    horas: "",
    data: "",
    usuario: "",
    grupo: "",
  });

  // Estado para o formulário de login
  const [formLogin, setFormLogin] = useState({
    email: "",
    senha: "",
  });

  return (
    <Router>
      <Routes>
        {/* Rota protegida para cadastro de usuários, acessível apenas por ADMIN */}
        <Route
          path="/cadastro"
          element={
            <ProtectedRoutes allowedRoles={["ADMIN"]}>
              <CriarUsuarios formData={formCadastro} setFormData={setFormCadastro} />
            </ProtectedRoutes>
          }
        />

        {/* Rota protegida para cadastro de usuários, acessível apenas por ADMIN */}
        <Route
          path="/atividades"
          element={
            <ProtectedRoutes allowedRoles={["ADMIN"]}>
              <CriarAtividades formData={formAtividade} setFormData={setFormsAtividade}/>
            </ProtectedRoutes>
          }
        />

        <Route
          path="/atividades/lista"
          element={
            <ProtectedRoutes allowedRoles={["ADMIN"]}>
              <ListarAtividades formData={formAtividade} setFormData={setFormsAtividade}/>
            </ProtectedRoutes>
          }
        />

      <Route
          path="/lista"
          element={
            <ProtectedRoutes allowedRoles={["ADMIN","VOLUNTARIO"]}>
              <ListarUsuarios/>
            </ProtectedRoutes>
          }
        />
      <Route
          path="/unauthorized"
          element={
            <AcessoNegado/>
          }
        />

        {/* Rota de login */}
        <Route
          path="/login"
          element={<LogarUsuarios formData={formLogin} setFormData={setFormLogin} />}
        />
      </Routes>
    </Router>
  );
}

export default App;
