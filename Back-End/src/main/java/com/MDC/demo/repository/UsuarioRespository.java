package com.MDC.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.MDC.demo.model.Usuarios;

@Repository
public interface UsuarioRespository extends JpaRepository<Usuarios,Long>{
    
}
