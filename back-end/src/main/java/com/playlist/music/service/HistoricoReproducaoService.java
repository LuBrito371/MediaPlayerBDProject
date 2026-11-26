package com.playlist.music.service;

import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.playlist.music.entities.HistoricoReproducao;
import com.playlist.music.entities.HistoricoReproducaoId;
import com.playlist.music.entities.Musica;
import com.playlist.music.entities.Usuario;
import com.playlist.music.exception.ResourceNotFoundException;
import com.playlist.music.repository.HistoricoReproducaoRepository;
import com.playlist.music.repository.MusicaRepository;
import com.playlist.music.repository.UsuarioRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class HistoricoReproducaoService {

    private final UsuarioRepository usuarioRepository;
    private final MusicaRepository musicaRepository;
    private final HistoricoReproducaoRepository repository;

    public List<HistoricoReproducao> listarPorUsuario(Integer usuarioId) {
        if (!usuarioRepository.existsById(usuarioId)) {
            throw new ResourceNotFoundException("Usuário não encontrado com ID: " + usuarioId);
        }
        return repository.findByUsuario_IdUsuarioOrderById_DataHoraReproducaoDesc(usuarioId);
    }

    @Transactional
    public HistoricoReproducao registrar(Integer usuarioId, Integer musicaId) {
        Usuario usuario = usuarioRepository.findById(usuarioId)
                .orElseThrow(() -> new ResourceNotFoundException("Usuário não encontrado com ID: " + usuarioId));

        Musica musica = musicaRepository.findById(musicaId)
                .orElseThrow(() -> new ResourceNotFoundException("Música não encontrada com ID: " + musicaId));

        LocalDateTime agora = LocalDateTime.now().truncatedTo(ChronoUnit.MILLIS);
        HistoricoReproducaoId id = new HistoricoReproducaoId(usuarioId, musicaId, agora);

        HistoricoReproducao historico = new HistoricoReproducao(id, usuario, musica);
        return repository.save(historico);
    }
}
