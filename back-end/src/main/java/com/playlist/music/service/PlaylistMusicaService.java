package com.playlist.music.service;

import java.time.LocalDate;
import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.playlist.music.entities.Musica;
import com.playlist.music.entities.Playlist;
import com.playlist.music.entities.PlaylistMusica;
import com.playlist.music.entities.PlaylistMusicaId;
import com.playlist.music.exception.ResourceNotFoundException;
import com.playlist.music.repository.MusicaRepository;
import com.playlist.music.repository.PlaylistMusicaRepository;
import com.playlist.music.repository.PlaylistRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class PlaylistMusicaService {

    private final PlaylistRepository playlistRepository;
    private final MusicaRepository musicaRepository;
    private final PlaylistMusicaRepository repository;

    public List<PlaylistMusica> buscarMusicasPorPlaylist(Integer playlistId) {
        if (!playlistRepository.existsById(playlistId)) {
            throw new ResourceNotFoundException("Playlist não encontrada com ID: " + playlistId);
        }
        return repository.findByPlaylist_IdPlaylist(playlistId);
    }

    @Transactional
    public PlaylistMusica adicionarMusica(Integer playlistId, Integer musicaId) {
        Playlist playlist = playlistRepository.findById(playlistId)
                .orElseThrow(() -> new ResourceNotFoundException("Playlist não encontrada com ID: " + playlistId));

        Musica musica = musicaRepository.findById(musicaId)
                .orElseThrow(() -> new ResourceNotFoundException("Música não encontrada com ID: " + musicaId));

        PlaylistMusicaId id = new PlaylistMusicaId(playlistId, musicaId);

        PlaylistMusica playlistMusica = new PlaylistMusica(id, playlist, musica, LocalDate.now());
        return repository.save(playlistMusica);
    }

    @Transactional
    public void removerMusica(Integer playlistId, Integer musicaId) {
        PlaylistMusicaId id = new PlaylistMusicaId(playlistId, musicaId);
        if (!repository.existsById(id)) {
            throw new ResourceNotFoundException("Música não encontrada nesta playlist.");
        }
        repository.deleteById(id);
    }
}
