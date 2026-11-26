package com.playlist.music.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.playlist.music.entities.Artista;

public interface ArtistaRepository extends JpaRepository<Artista, Integer> {
}
