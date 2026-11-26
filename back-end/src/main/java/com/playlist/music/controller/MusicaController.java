package com.playlist.music.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.playlist.music.entities.Musica;
import com.playlist.music.service.MusicaService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/musicas")
@RequiredArgsConstructor
public class MusicaController {

    private final MusicaService service;

    @GetMapping
    public List<Musica> listar() {
        return service.listar();
    }

    @GetMapping("/{id}")
    public Musica buscar(@PathVariable Integer id) {
        return service.buscarPorId(id);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Musica salvar(@RequestBody Musica musica) {
        return service.salvar(musica);
    }

    @PutMapping("/{id}")
    public Musica atualizar(@PathVariable Integer id, @RequestBody Musica musica) {
        return service.atualizar(id, musica);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deletar(@PathVariable Integer id) {
        service.deletar(id);
    }
}
