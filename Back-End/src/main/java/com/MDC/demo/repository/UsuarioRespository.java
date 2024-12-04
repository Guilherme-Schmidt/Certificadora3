package com.MDC.demo.repository;

import com.MDC.demo.model.Usuarios;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UsuarioRespository extends JpaRepository<Usuarios, Long> {
  Usuarios findByEmail(String email); // Certifique-se de que retorna Usuarios
}
