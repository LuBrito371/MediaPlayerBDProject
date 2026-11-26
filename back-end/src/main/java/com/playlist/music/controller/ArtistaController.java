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

import com.playlist.music.entities.Artista;
import com.playlist.music.service.ArtistaService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/artistas")
@RequiredArgsConstructor
public class ArtistaController {

    private final ArtistaService service;

    @GetMapping
    public List<Artista> listar() {
        return service.listar();
    }

    @GetMapping("/{id}")
    public Artista buscar(@PathVariable Integer id) {
        return service.buscarPorId(id);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Artista salvar(@RequestBody Artista artista) {
        return service.salvar(artista);
    }

    @PutMapping("/{id}")
    public Artista atualizar(@PathVariable Integer id, @RequestBody Artista artista) {
        return service.atualizar(id, artista);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deletar(@PathVariable Integer id) {
        service.deletar(id);
    }
}
