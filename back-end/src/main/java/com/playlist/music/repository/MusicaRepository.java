package com.playlist.music.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;

import com.playlist.music.entities.Musica;

public interface MusicaRepository extends JpaRepository<Musica, Integer> {

    @Override
    @EntityGraph(attributePaths = {"album", "album.artista"})
    List<Musica> findAll();

    @Override
    @EntityGraph(attributePaths = {"album", "album.artista"})
    Optional<Musica> findById(Integer id);
}
