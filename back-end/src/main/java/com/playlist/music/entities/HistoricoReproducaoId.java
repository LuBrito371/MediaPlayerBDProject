package com.playlist.music.entities;

import java.io.Serializable;
import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Embeddable
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode
public class HistoricoReproducaoId implements Serializable {

    private Integer idUsuario;
    private Integer idMusica;

    @Column(name = "data_hora_reproducao", nullable = false)
    private LocalDateTime dataHoraReproducao;
}
