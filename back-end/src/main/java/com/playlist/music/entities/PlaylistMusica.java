package com.playlist.music.entities;

import java.time.LocalDate;

import jakarta.persistence.Column;
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
@Table(name = "playlist_musica")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class PlaylistMusica {

    @EmbeddedId
    private PlaylistMusicaId id;

    @ManyToOne(optional = false)
    @MapsId("idPlaylist")
    @JoinColumn(name = "id_playlist", nullable = false)
    private Playlist playlist;

    @ManyToOne(optional = false)
    @MapsId("idMusica")
    @JoinColumn(name = "id_musica", nullable = false)
    private Musica musica;

    @Column(name = "data_adicao", nullable = false)
    private LocalDate dataAdicao;
}
