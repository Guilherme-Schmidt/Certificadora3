package com.MDC.demo.controller;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

import com.MDC.demo.infra.security.TokenService;
import com.MDC.demo.model.AuthenticationDto;
import com.MDC.demo.model.LoginResponseDTO;
import com.MDC.demo.model.RegisterDto;
import com.MDC.demo.repository.UsuarioRespository;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.*;

import com.MDC.demo.model.Usuarios;
import com.MDC.demo.service.UsuarioService;

@RestController
@RequestMapping("/usuarios")
public class UsuarioController {

    @Autowired
    private UsuarioService usuarioService;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private UsuarioRespository usuarioRespository;

    @Autowired
    private TokenService tokenService;

    @PostMapping("/auth/login")
    public ResponseEntity login(@RequestBody @Valid AuthenticationDto data){
        var usernamePassword = new UsernamePasswordAuthenticationToken(data.email(),data.senha());
        var auth = this.authenticationManager.authenticate(usernamePassword);

        var token = tokenService.generateToken((Usuarios) auth.getPrincipal());
        return ResponseEntity.ok(new LoginResponseDTO(token));
    }

    @PostMapping("/auth/register")
    public ResponseEntity createUsuario(@RequestBody @Valid RegisterDto usuario) {
        if (this.usuarioRespository.findByEmail(usuario.email()) != null) {
            return ResponseEntity.badRequest().build();
        }

        // Verificar se a senha não é vazia
        if (usuario.senha() == null || usuario.senha().isEmpty()) {
            return ResponseEntity.badRequest().body("A senha não pode ser vazia");
        }

        // Criptografar a senha
        String encryptedPassword = new BCryptPasswordEncoder().encode(usuario.senha());
        Usuarios newUsuario = new Usuarios(usuario.nome(), usuario.funcao(), usuario.setor(), usuario.dataEntrada(),
                usuario.dataSaida(), usuario.permissao(), usuario.email(), encryptedPassword);

        this.usuarioRespository.save(newUsuario);
        return ResponseEntity.ok().build();
    }


    //Rota para ver todos os usuarios
    @GetMapping
    public ResponseEntity<List<Usuarios>> getAllUsuario(){
        List<Usuarios> usuarios = usuarioService.getAllUsuario();
        return new ResponseEntity<>(usuarios, HttpStatus.OK);
    }

    //Visualizar usuario por id
    @GetMapping("/{id}")
    public ResponseEntity<Usuarios> getUsuarioById(@PathVariable Long id){
        Optional<Usuarios> usuario = usuarioService.getUsuarioById(id);
        return usuario.map(value -> new ResponseEntity<>(value, HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

     // Atualizar um usuário por id
     @PutMapping("/{id}")
     public ResponseEntity<Usuarios> updateUsuario(@PathVariable Long id, @RequestBody Usuarios usuarioAtualizado) {
         try {
             Usuarios updatedUsuario = usuarioService.updateUsuario(id, usuarioAtualizado);
             return new ResponseEntity<>(updatedUsuario, HttpStatus.OK);
         } catch (NoSuchElementException e) {
             return new ResponseEntity<>(HttpStatus.NOT_FOUND);
         }
     }

    // Deletar um usuário por id
     @DeleteMapping("/{id}")
     public ResponseEntity<Void> deleteUsuario(@PathVariable Long id) {
         usuarioService.deleteUsuario(id);
         return new ResponseEntity<>(HttpStatus.NO_CONTENT);
     }
}
