package com.playlist.music.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.playlist.music.entities.PlaylistMusica;
import com.playlist.music.service.PlaylistMusicaService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/playlists")
@RequiredArgsConstructor
public class PlaylistMusicaController {

    private final PlaylistMusicaService service;

    @GetMapping("/{playlistId}/musicas")
    public List<PlaylistMusica> listarMusicasDaPlaylist(@PathVariable Integer playlistId) {
        return service.buscarMusicasPorPlaylist(playlistId);
    }

    @PostMapping("/{playlistId}/musicas/{musicaId}")
    @ResponseStatus(HttpStatus.CREATED)
    public PlaylistMusica adicionarMusica(
            @PathVariable Integer playlistId,
            @PathVariable Integer musicaId) {
        return service.adicionarMusica(playlistId, musicaId);
    }

    @DeleteMapping("/{playlistId}/musicas/{musicaId}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void removerMusica(
            @PathVariable Integer playlistId,
            @PathVariable Integer musicaId) {
        service.removerMusica(playlistId, musicaId);
    }
}
