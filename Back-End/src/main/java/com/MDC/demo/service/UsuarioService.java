package com.MDC.demo.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.MDC.demo.model.Usuarios;
import com.MDC.demo.repository.UsuarioRespository;

@Service
public class UsuarioService {
    
    @Autowired
    private UsuarioRespository usuarioRespository;

    //Criacao de usuarios
    public Usuarios saveUsuario(Usuarios usuarios){
        return usuarioRespository.save(usuarios);
    }
    
    //Visualizar todos os usuarios
    public List<Usuarios> getAllUsuario(){
        return usuarioRespository.findAll();
    }

    //Visualizar usuario por id
    public Optional<Usuarios> getUsuarioById(Long id){
        return usuarioRespository.findById(id);
    }
    
    //Atualizar os usuarios com parametro ID
    public Usuarios updateUsuario(Long id, Usuarios usuariosAtualizados){
        if(usuarioRespository.existsById(id)){
            usuariosAtualizados.setId(id);
            return usuarioRespository.save(usuariosAtualizados);
        }
        return null; // trocar por uma execao (futuro)
    }

    //Excluir usuario por Id
    public void deleteUsuario(Long id){
        usuarioRespository.deleteById(id);
    }


}
