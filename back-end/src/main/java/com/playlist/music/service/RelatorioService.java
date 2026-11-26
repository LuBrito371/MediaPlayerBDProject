package com.playlist.music.service;

import java.util.Collections;
import java.util.List;
import java.util.Map;

import org.springframework.dao.DataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class RelatorioService {

    private final JdbcTemplate jdbcTemplate;

    public List<Map<String, Object>> relatorioUsuariosDia() {
        return jdbcTemplate.queryForList("""
            SELECT
                u.id_usuario,
                u.nome AS usuario,
                DATE(h.data_hora_reproducao) AS dia,
                COUNT(*) AS total_reproducoes,
                COUNT(DISTINCT h.id_musica) AS musicas_distintas,
                ROUND(SUM(m.duracao) / 60.0, 2) AS total_minutos
            FROM historico_reproducao h
            JOIN usuario u ON u.id_usuario = h.id_usuario
            JOIN musica m ON m.id_musica = h.id_musica
            GROUP BY u.id_usuario, u.nome, DATE(h.data_hora_reproducao)
            ORDER BY dia DESC, total_reproducoes DESC
        """);
    }

    public List<Map<String, Object>> relatorioPlaylists() {
        return jdbcTemplate.queryForList("""
            SELECT
                p.id_playlist,
                p.nome_playlist,
                u.nome AS dono_playlist,
                COUNT(pm.id_musica) AS total_musicas,
                ROUND(COALESCE(SUM(m.duracao), 0) / 60.0, 2) AS duracao_total_minutos
            FROM playlist p
            JOIN usuario u ON u.id_usuario = p.id_usuario
            LEFT JOIN playlist_musica pm ON pm.id_playlist = p.id_playlist
            LEFT JOIN musica m ON m.id_musica = pm.id_musica
            GROUP BY p.id_playlist, p.nome_playlist, u.nome
            ORDER BY total_musicas DESC, duracao_total_minutos DESC
        """);
    }

    public List<Map<String, Object>> relatorioRankingArtistas() {
        return jdbcTemplate.queryForList("""
            SELECT
                ar.id_artista,
                ar.nome AS artista,
                COUNT(h.data_hora_reproducao) AS total_reproducoes,
                COUNT(DISTINCT h.id_usuario) AS usuarios_unicos
            FROM artista ar
            LEFT JOIN album al ON al.id_artista = ar.id_artista
            LEFT JOIN musica m ON m.id_album = al.id_album
            LEFT JOIN historico_reproducao h ON h.id_musica = m.id_musica
            GROUP BY ar.id_artista, ar.nome
            ORDER BY total_reproducoes DESC, usuarios_unicos DESC
        """);
    }

    public List<Map<String, Object>> relatorioAuditoriaUsuarios() {
        try {
            return jdbcTemplate.queryForList("""
                SELECT
                    id_auditoria,
                    id_usuario,
                    nome_anterior,
                    nome_novo,
                    email_anterior,
                    email_novo,
                    data_alteracao
                FROM auditoria_usuario
                ORDER BY data_alteracao DESC
                LIMIT 50
            """);
        } catch (DataAccessException ex) {
            return Collections.emptyList();
        }
    }
}
