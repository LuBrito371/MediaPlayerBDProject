package com.playlist.music.service;

import java.util.List;

import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.playlist.music.entities.Artista;
import com.playlist.music.exception.BusinessValidationException;
import com.playlist.music.exception.ResourceNotFoundException;
import com.playlist.music.repository.ArtistaRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class ArtistaService {

    private final ArtistaRepository repository;

    public List<Artista> listar() {
        return repository.findAll(Sort.by(Sort.Direction.ASC, "idArtista"));
    }

    public Artista buscarPorId(Integer id) {
        return repository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Artista não encontrado com ID: " + id));
    }

    @Transactional
    public Artista salvar(Artista artista) {
        validar(artista);
        return repository.save(artista);
    }

    @Transactional
    public Artista atualizar(Integer id, Artista dados) {
        validar(dados);
        Artista existente = buscarPorId(id);
        existente.setNome(dados.getNome().trim());
        return repository.save(existente);
    }

    @Transactional
    public void deletar(Integer id) {
        if (!repository.existsById(id)) {
            throw new ResourceNotFoundException("Artista não encontrado com ID: " + id);
        }
        repository.deleteById(id);
    }

    private void validar(Artista artista) {
        if (artista == null || artista.getNome() == null || artista.getNome().isBlank()) {
            throw new BusinessValidationException("O nome do artista é obrigatório.");
        }
        artista.setNome(artista.getNome().trim());
    }
}
