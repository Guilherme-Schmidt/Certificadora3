package com.MDC.demo.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.MDC.demo.model.Atividades;

public interface AtividadeRepository extends JpaRepository<Atividades,Long> {
    List<Atividades> findByUsuarioId(Long userId);
}
