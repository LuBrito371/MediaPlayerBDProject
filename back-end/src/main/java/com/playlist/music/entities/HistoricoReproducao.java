package com.playlist.music.entities;

import jakarta.persistence.EmbeddedId;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.MapsId;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "historico_reproducao")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class HistoricoReproducao {

    @EmbeddedId
    private HistoricoReproducaoId id;

    @ManyToOne(optional = false)
    @MapsId("idUsuario")
    @JoinColumn(name = "id_usuario", nullable = false)
    private Usuario usuario;

    @ManyToOne(optional = false)
    @MapsId("idMusica")
    @JoinColumn(name = "id_musica", nullable = false)
    private Musica musica;
}
