package com.MDC.demo.service;

import com.MDC.demo.model.Atividades;
import com.MDC.demo.repository.AtividadeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

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
