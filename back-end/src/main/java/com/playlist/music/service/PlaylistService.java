package com.playlist.music.service;

import java.time.LocalDate;
import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.playlist.music.entities.Playlist;
import com.playlist.music.entities.Usuario;
import com.playlist.music.exception.BusinessValidationException;
import com.playlist.music.exception.ResourceNotFoundException;
import com.playlist.music.repository.PlaylistRepository;
import com.playlist.music.repository.UsuarioRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class PlaylistService {

    private final PlaylistRepository repository;
    private final UsuarioRepository usuarioRepository;

    public List<Playlist> listar() {
        return repository.findAll();
    }

    public Playlist buscarPorId(Integer id) {
        return repository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Playlist não encontrada com ID: " + id));
    }

    @Transactional
    public Playlist salvar(Playlist playlist) {
        if (playlist == null || playlist.getNomePlaylist() == null || playlist.getNomePlaylist().isBlank()) {
            throw new BusinessValidationException("O nome da playlist é obrigatório.");
        }
        if (playlist.getUsuario() == null || playlist.getUsuario().getIdUsuario() == null) {
            throw new BusinessValidationException("O usuário proprietário da playlist é obrigatório.");
        }

        Integer usuarioId = playlist.getUsuario().getIdUsuario();
        Usuario usuario = usuarioRepository.findById(usuarioId)
                .orElseThrow(() -> new ResourceNotFoundException("Usuário não encontrado com ID: " + usuarioId));

        playlist.setNomePlaylist(playlist.getNomePlaylist().trim());
        playlist.setUsuario(usuario);
        if (playlist.getDataCriacao() == null) {
            playlist.setDataCriacao(LocalDate.now());
        }

        return repository.save(playlist);
    }

    @Transactional
    public Playlist atualizar(Integer id, Playlist dados) {
        Playlist existente = buscarPorId(id);
        if (dados.getNomePlaylist() == null || dados.getNomePlaylist().isBlank()) {
            throw new BusinessValidationException("O nome da playlist é obrigatório.");
        }

        existente.setNomePlaylist(dados.getNomePlaylist().trim());
        if (dados.getDataCriacao() != null) {
            existente.setDataCriacao(dados.getDataCriacao());
        }
        if (dados.getUsuario() != null && dados.getUsuario().getIdUsuario() != null) {
            Integer usuarioId = dados.getUsuario().getIdUsuario();
            Usuario usuario = usuarioRepository.findById(usuarioId)
                    .orElseThrow(() -> new ResourceNotFoundException("Usuário não encontrado com ID: " + usuarioId));
            existente.setUsuario(usuario);
        }

        return repository.save(existente);
    }

    @Transactional
    public void deletar(Integer id) {
        if (!repository.existsById(id)) {
            throw new ResourceNotFoundException("Playlist não encontrada com ID: " + id);
        }
        repository.deleteById(id);
    }
}
