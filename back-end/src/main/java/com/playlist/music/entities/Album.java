package com.playlist.music.entities;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "album")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Album {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_album")
    private Integer idAlbum;

    @Column(nullable = false, length = 100)
    private String titulo;

    @Column(name = "ano_lancamento", nullable = false)
    private Integer anoLancamento;

    @Column(nullable = false, length = 50)
    private String genero;

    @ManyToOne(optional = false)
    @JoinColumn(name = "id_artista", nullable = false)
    private Artista artista;
}
