import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import axios from "axios";

// Função para validar se o usuário é admin
async function validateAdmin() {
  const token = localStorage.getItem("token");
  try {
    const response = await axios.get("/usuarios/auth/validate-admin", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data === "Usuário é administrador.";
  } catch (error) {
    console.error("Erro ao validar admin:", error.response?.data || error.message);
    return false;
  }
}

function ProtectedRoutes({ children, allowedRoles }) {
  const token = localStorage.getItem("token");

  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true); // Inicializa o loading como true

  // Validação e alteração do estado antes da renderização
  const checkAdminStatus = async () => {
    if (allowedRoles && allowedRoles.includes("ADMIN")) {
      const isAdminValid = await validateAdmin();
      setIsAdmin(isAdminValid);
    } else {
      setIsAdmin(false);
    }
    setLoading(false);
  };

  // Chama a validação assim que o componente for renderizado
  if (loading) {
    checkAdminStatus();
    return <div>Carregando...</div>; // Exibe mensagem de loading
  }

  if (!token) {
    return <Navigate to="/login" />;
  }

  try {
    const decoded = jwtDecode(token);

    // Verifica se o usuário é admin, se necessário
    if (!isAdmin) {
      return <Navigate to="/cadastro" />;
    }
    return children; // Retorna os filhos caso o usuário seja admin
  } catch (error) {
    console.error("Token inválido ou erro ao decodificar:", error);
    localStorage.removeItem("token");
    return <Navigate to="/login" />;
  }
}

export default ProtectedRoutes;
