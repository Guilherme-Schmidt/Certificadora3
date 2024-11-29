package com.MDC.demo.model;

import jakarta.persistence.*;
import lombok.Data;

import java.time.Duration;
import java.time.LocalDate;

@Entity
@Data
@Table(name= "atividades")
public class Atividades {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID_atividade")
    private Long id;

    @Column(name = "Nome",nullable = false,length = 100)
    private String nome;

    @Column(name="Descricao")
    private String descricao;

    @Column(name="Horas",nullable = false)
    private Duration horas;

    @Column(name="Data",nullable = false)
    private LocalDate data;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "ID_Usuario", nullable = false)
    private Usuarios usuario;

    @Enumerated(EnumType.STRING)
    @Column(name = "Grupo", nullable = false)
    private GrupoAtividades grupo;


}
