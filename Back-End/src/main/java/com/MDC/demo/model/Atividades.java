package com.MDC.demo.model;

import java.time.LocalDate;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Data;

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
    private String horas;

    @Column(name="Data",nullable = false)
    private LocalDate data;

    @ManyToOne(fetch = FetchType.LAZY)
    @JsonIgnore
    @JoinColumn(name = "ID_Usuario", nullable = false)
    private Usuarios usuario;

    @Enumerated(EnumType.STRING)
    @Column(name = "Grupo", nullable = false)
    private GrupoAtividades grupo;


}
