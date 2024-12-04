package com.MDC.demo.model;

import java.time.LocalDate;

public record RegisterDto(
        String nome,
        String funcao,
        String setor,
        LocalDate dataEntrada,
        LocalDate dataSaida,
        Permissao permissao,
        String email,
        String senha
) {}