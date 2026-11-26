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
@Table(name = "musica")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Musica {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_musica")
    private Integer idMusica;

    @Column(nullable = false, length = 100)
    private String titulo;

    @Column(nullable = false)
    private Integer duracao;

    @Column(name = "url_musica", nullable = false, length = 255)
    private String urlMusica;

    @ManyToOne(optional = false)
    @JoinColumn(name = "id_album", nullable = false)
    private Album album;
}
