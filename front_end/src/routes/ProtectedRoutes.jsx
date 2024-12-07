import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import {jwtDecode} from "jwt-decode"; // Corrigi o import de jwtDecode
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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAdminStatus = async () => {
      if (allowedRoles && allowedRoles.includes("ADMIN")) {
        const isAdminValid = await validateAdmin();
        setIsAdmin(isAdminValid);
      } else {
        setIsAdmin(true); // Permite acesso para roles diferentes de ADMIN
      }
      setLoading(false);
    };

    checkAdminStatus();
  }, [allowedRoles]);

  if (!token) {
    return <Navigate to="/login" />;
  }

  try {
    const decoded = jwtDecode(token);

    // Verifica a expiração do token
    const isExpired = decoded.exp * 1000 < Date.now();
    if (isExpired) {
      localStorage.removeItem("token");
      return <Navigate to="/login" />;
    }

    if (loading) {
      return <div>Carregando...</div>;
    }

    // Verifica se o usuário é admin quando necessário
    if (allowedRoles && allowedRoles.includes("ADMIN") && !isAdmin) {
      return <Navigate to="/unauthorized" />;
    }

    return children; // Permite acesso se todas as validações passarem
  } catch (error) {
    console.error("Token inválido ou erro ao decodificar:", error);
    localStorage.removeItem("token");
    return <Navigate to="/login" />;
  }
}

export default ProtectedRoutes;
