package com.playlist.music.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.playlist.music.entities.HistoricoReproducao;
import com.playlist.music.service.HistoricoReproducaoService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/historico")
@RequiredArgsConstructor
public class ReproducaoController {

    private final HistoricoReproducaoService service;

    @GetMapping("/{usuarioId}")
    public List<HistoricoReproducao> listarHistorico(@PathVariable Integer usuarioId) {
        return service.listarPorUsuario(usuarioId);
    }

    @PostMapping("/{usuarioId}/reproduzir/{musicaId}")
    @ResponseStatus(HttpStatus.CREATED)
    public HistoricoReproducao reproduzir(
            @PathVariable Integer usuarioId,
            @PathVariable Integer musicaId) {
        return service.registrar(usuarioId, musicaId);
    }
}
