package com.MDC.demo.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.*;

import com.MDC.demo.model.Usuarios;
import com.MDC.demo.service.UsuarioService;

@RestController
@RequestMapping("/usuarios")
public class UsuarioController {
    
    @Autowired
    private UsuarioService usuarioService;

    //Rota para criar usuario
    @PostMapping
    public ResponseEntity<Usuarios> createUsuario(@RequestBody Usuarios usuarios){
        Usuarios novoUsuario = usuarioService.saveUsuario(usuarios);
        return new ResponseEntity<>(novoUsuario,HttpStatus.CREATED);
    }

    //Rota para ver todos os usuarios
    @GetMapping
    public ResponseEntity<List<Usuarios>> getAllUsuario(){
        List<Usuarios> usuarios = usuarioService.getAllUsuario();
        return new ResponseEntity<>(usuarios, HttpStatus.OK);
    }

    //Visualizar usuario por id
    public ResponseEntity<Usuarios> getUsuarioById(@PathVariable Long id){
        Optional<Usuarios> usuario = usuarioService.getUsuarioById(id);
        return usuario.map(value -> new ResponseEntity<>(value, HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

     // Atualizar um usuário por id
     @PutMapping("/{id}")
     public ResponseEntity<Usuarios> updateUsuario(@PathVariable Long id, @RequestBody Usuarios usuarioAtualizado) {
         Usuarios updatedUsuario = usuarioService.updateUsuario(id, usuarioAtualizado);
         if (updatedUsuario != null) {
             return new ResponseEntity<>(updatedUsuario, HttpStatus.OK);
         }
         return new ResponseEntity<>(HttpStatus.NOT_FOUND);
     }
 
     // Deletar um usuário por id
     @DeleteMapping("/{id}")
     public ResponseEntity<Void> deleteUsuario(@PathVariable Long id) {
         usuarioService.deleteUsuario(id);
         return new ResponseEntity<>(HttpStatus.NO_CONTENT);
     }

}
