import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import ProtectedRoutes from './routes/ProtectedRoutes.jsx';

// Importar componentes
import CriarUsuarios from "./pages/criarUsuarios.jsx";
import LogarUsuarios from "./pages/logarUsuarios.jsx";

function App() {
  // Estado para o formulário de cadastro
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
              <CriarUsuarios formData={formCadastro} setFormData={setForm} />
            </ProtectedRoutes>
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
