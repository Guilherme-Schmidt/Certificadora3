package com.MDC.demo.controller;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.MDC.demo.infra.security.TokenService;
import com.MDC.demo.model.Atividades;
import com.MDC.demo.model.Usuarios;
import com.MDC.demo.repository.UsuarioRespository;
import com.MDC.demo.service.AtividadeService;

@RestController
@RequestMapping("/atividades")
public class AtividadeController {
    @Autowired
    private AtividadeService atividadeService;

    @Autowired
    private TokenService tokenService;

    @Autowired
    private UsuarioRespository usuarioRespository;

    @PostMapping
    public ResponseEntity<Atividades> createAtividade(@RequestBody Atividades atividade) {
        Atividades savedAtividade = atividadeService.saveAtividade(atividade);

        System.out.println(savedAtividade);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedAtividade);
    }

    // Rota para ver todas as atividades
    @GetMapping
    public ResponseEntity<List<Atividades>> getAllAtividades() {
        List<Atividades> atividades = atividadeService.getAllAtividades();
        return new ResponseEntity<>(atividades, HttpStatus.OK);
    }

    // Visualizar atividade por id
    @GetMapping("/{id}")
    public ResponseEntity<Atividades> getAtividadeById(@PathVariable Long id) {
        Optional<Atividades> atividade = atividadeService.getAtividadeById(id);
        return atividade.map(value -> new ResponseEntity<>(value, HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Atividades>> getAtividadesByUserId(@PathVariable Long userId) {
        List<Atividades> atividades = atividadeService.getAtividadesByUserId(userId);
            if (atividades.isEmpty()) {
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }
        return new ResponseEntity<>(atividades, HttpStatus.OK);
    }

    @GetMapping("/user/me")
    public ResponseEntity<List<Atividades>> getAtividadesDoUsuarioLogado(@RequestHeader("Authorization") String authorizationHeader) {
        try {
            // Extrair o token do cabeçalho
            String token = authorizationHeader.replace("Bearer ", "").trim();
            String email = tokenService.validateToken(token);

            if (email == null || email.isEmpty()) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
            }

            // Recuperar o usuário logado pelo email
            Usuarios usuario = usuarioRespository.findByEmail(email);
            if (usuario == null) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
            }

            // Buscar atividades pelo ID do usuário
            List<Atividades> atividades = atividadeService.getAtividadesByUserId(usuario.getId());
            if (atividades.isEmpty()) {
                return ResponseEntity.status(HttpStatus.NO_CONTENT).body(null);
            }

            return ResponseEntity.ok(atividades);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }


    // Atualizar uma atividade por id
    @PutMapping("/{id}")
    public ResponseEntity<Atividades> updateAtividade(@PathVariable Long id, @RequestBody Atividades atividadeAtualizada) {
        try {
            Atividades updatedAtividade = atividadeService.updateAtividade(id, atividadeAtualizada);
            return new ResponseEntity<>(updatedAtividade, HttpStatus.OK);
        } catch (NoSuchElementException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    // Deletar uma atividade por id
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteAtividade(@PathVariable Long id) {
        atividadeService.deleteAtividade(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
