package com.MDC.demo.model;

import jakarta.persistence.*;
import lombok.Data;

@Entity(name="permissao")
@Data
public class Permissao {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID_Permissao") // Nome do campo no banco de dados
    private Integer id;

    @Column(name = "Nome", nullable = false, unique = true, length = 50) // Respeitando as restrições do banco
    private String nome;
}
