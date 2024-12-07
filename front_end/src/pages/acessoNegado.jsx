import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Modal, Button } from "react-bootstrap";
import Header from "../components/Header";

function AcessoNegado() {
  const [showModal, setShowModal] = useState(true); // O modal aparece ao renderizar
  const navigate = useNavigate();

  // Fecha o modal e redireciona o usuário
  const handleClose = () => {
    setShowModal(false);
    navigate("/login"); // Redireciona para a página de login ou outra rota
  };

  return (
    <div>
        <Header/>
      <Modal show={showModal} onHide={handleClose} backdrop="static" centered>
        <Modal.Header>
          <Modal.Title>Acesso Negado</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Você não tem permissão para acessar esta página.</p>
          <p>Por favor, entre em contato com o administrador ou faça login com uma conta válida.</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleClose}>
            Ir para Login
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default AcessoNegado;
