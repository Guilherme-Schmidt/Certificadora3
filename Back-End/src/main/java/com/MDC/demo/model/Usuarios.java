package com.MDC.demo.model;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDate;

@Entity(name="usuarios")
@Data
public class Usuarios {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="ID_Usuario")
    private Long id;
    @Column(name="Nome",nullable = false,length = 100)
    private String nome;
    @Column(name="Funcao",length = 50)
    private String funcao;
    @Column(name="Setor",length = 50)
    private String setor;
    @Column(name="Data_Entrada",nullable = false)
    private LocalDate dataEntrada;
    @Column(name="Data_Saida")
    private LocalDate dataSaida;
    @ManyToOne
    @JoinColumn(name="Permissao",nullable = false)
    private Permissao permissao;
    @Column(name="Email",nullable = false,unique = true,length = 100)
    private String email;
    @Column(name="Senha",nullable = false,length = 100)
    private String senha;
}
