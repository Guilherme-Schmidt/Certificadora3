import React from "react";
import Header from "../components/Header.jsx";
import UserProfile from "../components/UserProfile.jsx";

function PaginaUsuario() {
  return (
    <div>
      <Header login={false} />
      <UserProfile />
    </div>
  );
}

export default PaginaUsuario;
