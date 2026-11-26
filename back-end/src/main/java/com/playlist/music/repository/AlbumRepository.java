package com.playlist.music.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;

import com.playlist.music.entities.Album;

public interface AlbumRepository extends JpaRepository<Album, Integer> {

    @Override
    @EntityGraph(attributePaths = {"artista"})
    List<Album> findAll();

    @Override
    @EntityGraph(attributePaths = {"artista"})
    Optional<Album> findById(Integer id);
}
