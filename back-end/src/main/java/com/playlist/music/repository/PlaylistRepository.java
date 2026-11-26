package com.playlist.music.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;

import com.playlist.music.entities.Playlist;

public interface PlaylistRepository extends JpaRepository<Playlist, Integer> {

    @Override
    @EntityGraph(attributePaths = {"usuario"})
    List<Playlist> findAll();

    @Override
    @EntityGraph(attributePaths = {"usuario"})
    Optional<Playlist> findById(Integer id);
}
