package com.MDC.demo.service;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.MDC.demo.model.Atividades;
import com.MDC.demo.repository.AtividadeRepository;

@Service
public class AtividadeService {
    @Autowired
    private AtividadeRepository atividadeRepository;


    @Autowired
    private UsuarioRespository usuarioRepository; // Certifique-se de que o repositório de usuário está injetado

    public Atividades saveAtividade(Atividades atividade) {
    // Verifica se o ID do usuário é válido
    Long userId = atividade.getUsuario().getId();
    Usuarios usuario = usuarioRepository.findById(userId)
            .orElseThrow(() -> new NoSuchElementException("Usuário não encontrado com ID: " + userId));

    // Associa o usuário à atividade
    atividade.setUsuario(usuario);

    return atividadeRepository.save(atividade);
}

    public List<Atividades> getAllAtividades() {
        return atividadeRepository.findAll();
    }

    public Optional<Atividades> getAtividadeById(Long id) {
        return atividadeRepository.findById(id);
    }

    // Buscar atividades por ID do usuário
    public List<Atividades> getAtividadesByUserId(Long userId) {
        return atividadeRepository.findByUsuarioId(userId);
    }

    public Atividades updateAtividade(Long id, Atividades atividadeAtualizada) {
        // Busca a atividade existente no banco de dados
        Atividades atividadeExistente = atividadeRepository.findById(id).orElseThrow(() -> new RuntimeException("Atividade não encontrada"));

        // Atualiza os campos com os dados fornecidos no JSON
        if (atividadeAtualizada.getNome() != null && !atividadeAtualizada.getNome().isEmpty()) {
            atividadeExistente.setNome(atividadeAtualizada.getNome());
        }

        if (atividadeAtualizada.getDescricao() != null && !atividadeAtualizada.getDescricao().isEmpty()) {
            atividadeExistente.setDescricao(atividadeAtualizada.getDescricao());
        }

        if (atividadeAtualizada.getHoras() != null && !atividadeAtualizada.getHoras().isEmpty()) {
            atividadeExistente.setHoras(atividadeAtualizada.getHoras());
        }

        if (atividadeAtualizada.getData() != null) {
            atividadeExistente.setData(atividadeAtualizada.getData());
        }

        if (atividadeAtualizada.getUsuario() != null) {
            atividadeExistente.setUsuario(atividadeAtualizada.getUsuario());
        }

        if (atividadeAtualizada.getGrupo() != null) {
            atividadeExistente.setGrupo(atividadeAtualizada.getGrupo());
        }

        // Salva a atividade atualizada no banco
        return atividadeRepository.save(atividadeExistente);
    }

    public void deleteAtividade(Long id) {
        // Verifica se a atividade existe
        if (atividadeRepository.existsById(id)) {
            atividadeRepository.deleteById(id);
        } else {
            throw new RuntimeException("Atividade não encontrada para exclusão");
        }
    }
}
