package com.MDC.demo.repository;

import com.MDC.demo.model.Atividades;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AtividadeRepository extends JpaRepository<Atividades,Long> {
}
