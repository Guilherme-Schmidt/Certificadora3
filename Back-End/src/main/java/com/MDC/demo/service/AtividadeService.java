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

    public Atividades saveAtividade(Atividades atividade) {
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
        Atividades atividade = atividadeRepository.findById(id)
                .orElseThrow(() -> new NoSuchElementException("Atividade não encontrada com ID: " + id));

        atividade.setNome(atividadeAtualizada.getNome());
        atividade.setDescricao(atividadeAtualizada.getDescricao());
        atividade.setHoras(atividadeAtualizada.getHoras());
        atividade.setData(atividadeAtualizada.getData());
        atividade.setGrupo(atividadeAtualizada.getGrupo());
        atividade.setUsuario(atividadeAtualizada.getUsuario());

        return atividadeRepository.save(atividade);
    }

    public void deleteAtividade(Long id) {
        atividadeRepository.deleteById(id);
    }
}
