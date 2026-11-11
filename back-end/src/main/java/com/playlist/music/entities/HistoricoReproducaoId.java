package com.playlist.music.entities;

import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.Objects;
import jakarta.persistence.Embeddable;

@Embeddable
public class HistoricoReproducaoId implements Serializable {

    private Integer idUsuario;
    private Integer idMusica;
    private LocalDateTime dataHoraReproducao;

    public HistoricoReproducaoId() {}

    public HistoricoReproducaoId(Integer idUsuario, Integer idMusica,
                                 LocalDateTime dataHoraReproducao) {
        this.idUsuario = idUsuario;
        this.idMusica = idMusica;
        this.dataHoraReproducao = dataHoraReproducao;
    }

    public Integer getIdUsuario() {
        return idUsuario;
    }

    public void setIdUsuario(Integer idUsuario) {
        this.idUsuario = idUsuario;
    }

    public Integer getIdMusica() {
        return idMusica;
    }

    public void setIdMusica(Integer idMusica) {
        this.idMusica = idMusica;
    }

    public LocalDateTime getDataHoraReproducao() {
        return dataHoraReproducao;
    }

    public void setDataHoraReproducao(LocalDateTime dataHoraReproducao) {
        this.dataHoraReproducao = dataHoraReproducao;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof HistoricoReproducaoId)) return false;
        HistoricoReproducaoId that = (HistoricoReproducaoId) o;
        return Objects.equals(idUsuario, that.idUsuario) &&
               Objects.equals(idMusica, that.idMusica) &&
               Objects.equals(dataHoraReproducao, that.dataHoraReproducao);
    }

    @Override
    public int hashCode() {
        return Objects.hash(idUsuario, idMusica, dataHoraReproducao);
    }
}
