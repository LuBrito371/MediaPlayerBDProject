package com.playlist.music.repository;

import java.util.List;

import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;

import com.playlist.music.entities.HistoricoReproducao;
import com.playlist.music.entities.HistoricoReproducaoId;

public interface HistoricoReproducaoRepository
        extends JpaRepository<HistoricoReproducao, HistoricoReproducaoId> {

    @EntityGraph(attributePaths = {"usuario", "musica", "musica.album", "musica.album.artista"})
    List<HistoricoReproducao> findByUsuario_IdUsuarioOrderById_DataHoraReproducaoDesc(Integer idUsuario);
}
