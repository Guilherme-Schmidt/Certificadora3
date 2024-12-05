package com.MDC.demo.model;

import jakarta.persistence.*;
import lombok.Data;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.time.LocalDate;
import java.util.Collection;
import java.util.List;

@Table (name="usuarios")
@Entity(name="usuarios")
@Data
public class Usuarios implements UserDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
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

    @Enumerated(EnumType.STRING)
    @Column(name="permissao",nullable = false)
    private Permissao permissao;

    @Column(name="Email",nullable = false,unique = true,length = 100)
    private String email;

    @Column(name="Senha",nullable = false,length = 100)
    private String senha;

    public Usuarios() {
    }

    public Usuarios(String nome, String funcao, String setor, LocalDate dataEntrada,
                    LocalDate dataSaida, Permissao permissao, String email, String senha) {
        this.id = id;
        this.nome = nome;
        this.funcao = funcao;
        this.setor = setor;
        this.dataEntrada = dataEntrada;
        this.dataSaida = dataSaida;
        this.permissao = permissao;
        this.email = email;
        this.senha = senha;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        if(this.permissao == Permissao.ADMIN) return List.of(new SimpleGrantedAuthority("ROLE_ADMIN"),new SimpleGrantedAuthority("ROLE_VOLUNTARIO"),new SimpleGrantedAuthority("ROLE_APOIADOR"));
        else return List.of(new SimpleGrantedAuthority("ROLE_VOLUNTARIO"),new SimpleGrantedAuthority("ROLE_APOIADOR"));
    }

    @Override
    public String getPassword() {
        return senha;
    }

    @Override
    public String getUsername() {
        return email;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }


}
