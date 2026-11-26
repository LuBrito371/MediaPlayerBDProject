-- ====================================
-- Povoamento realista para demonstração em portfólio
-- Objetivo: simular uso real do MediaPlayer com catálogo variado,
-- playlists temáticas, histórico recente de reproduções e eventos de auditoria
-- ====================================

BEGIN;

-- ====================================
-- 1. ARTISTAS (IDs 11..22)
-- ====================================
INSERT INTO ARTISTA (id_artista, nome) VALUES
    (11, 'Legião Urbana'),
    (12, 'Arctic Monkeys'),
    (13, 'Chico Buarque'),
    (14, 'Billie Eilish'),
    (15, 'Queen'),
    (16, 'Tim Maia'),
    (17, 'Dua Lipa'),
    (18, 'Nirvana'),
    (19, 'Seu Jorge'),
    (20, 'Daft Punk'),
    (21, 'Caetano Veloso'),
    (22, 'Fleetwood Mac')
ON CONFLICT (id_artista) DO NOTHING;

-- ====================================
-- 2. ÁLBUNS (IDs 21..38)
-- ====================================
INSERT INTO ALBUM (id_album, titulo, ano_lancamento, genero, id_artista) VALUES
    (21, 'Dois', 1986, 'Rock', 11),
    (22, 'As Quatro Estações', 1989, 'Rock', 11),
    (23, 'AM', 2013, 'Indie', 12),
    (24, 'Whatever People Say I Am', 2006, 'Indie', 12),
    (25, 'Construção', 1971, 'MPB', 13),
    (26, 'When We All Fall Asleep', 2019, 'Pop', 14),
    (27, 'Hit Me Hard and Soft', 2024, 'Pop', 14),
    (28, 'A Night at the Opera', 1975, 'Rock', 15),
    (29, 'Racional Vol. 1', 1975, 'Soul/MPB', 16),
    (30, 'Future Nostalgia', 2020, 'Pop', 17),
    (31, 'Nevermind', 1991, 'Rock', 18),
    (32, 'Músicas para Churrasco Vol. 1', 2011, 'MPB', 19),
    (33, 'Random Access Memories', 2013, 'Eletrônica', 20),
    (34, 'Discovery', 2001, 'Eletrônica', 20),
    (35, 'Transa', 1972, 'MPB', 21),
    (36, 'Rumours', 1977, 'Rock', 22),
    (37, 'Folklore', 2020, 'Indie', 3),
    (38, 'Music of the Spheres', 2021, 'Pop', 1)
ON CONFLICT (id_album) DO NOTHING;

-- ====================================
-- 3. MÚSICAS (IDs 31..66)
-- ====================================
INSERT INTO MUSICA (id_musica, titulo, duracao, url_musica, id_album) VALUES
    (31, 'Tempo Perdido', 302, 'https://stream.mediaplayer.app/tracks/tempo-perdido', 21),
    (32, 'Eduardo e Mônica', 272, 'https://stream.mediaplayer.app/tracks/eduardo-e-monica', 21),
    (33, 'Pais e Filhos', 308, 'https://stream.mediaplayer.app/tracks/pais-e-filhos', 22),
    (34, 'Do I Wanna Know?', 272, 'https://stream.mediaplayer.app/tracks/do-i-wanna-know', 23),
    (35, 'R U Mine?', 201, 'https://stream.mediaplayer.app/tracks/r-u-mine', 23),
    (36, '505', 253, 'https://stream.mediaplayer.app/tracks/505', 23),
    (37, 'I Bet You Look Good on the Dancefloor', 173, 'https://stream.mediaplayer.app/tracks/dancefloor', 24),
    (38, 'Construção', 384, 'https://stream.mediaplayer.app/tracks/construcao', 25),
    (39, 'Cálice', 241, 'https://stream.mediaplayer.app/tracks/calice', 25),
    (40, 'bad guy', 194, 'https://stream.mediaplayer.app/tracks/bad-guy', 26),
    (41, 'when the party''s over', 196, 'https://stream.mediaplayer.app/tracks/party-over', 26),
    (42, 'BIRDS OF A FEATHER', 210, 'https://stream.mediaplayer.app/tracks/birds-of-a-feather', 27),
    (43, 'Bohemian Rhapsody', 354, 'https://stream.mediaplayer.app/tracks/bohemian-rhapsody', 28),
    (44, 'Love of My Life', 219, 'https://stream.mediaplayer.app/tracks/love-of-my-life', 28),
    (45, 'Imunização Racional (Que Beleza)', 308, 'https://stream.mediaplayer.app/tracks/que-beleza', 29),
    (46, 'Bom Senso', 305, 'https://stream.mediaplayer.app/tracks/bom-senso', 29),
    (47, 'Don''t Start Now', 183, 'https://stream.mediaplayer.app/tracks/dont-start-now', 30),
    (48, 'Levitating', 203, 'https://stream.mediaplayer.app/tracks/levitating', 30),
    (49, 'Smells Like Teen Spirit', 301, 'https://stream.mediaplayer.app/tracks/teen-spirit', 31),
    (50, 'Come As You Are', 219, 'https://stream.mediaplayer.app/tracks/come-as-you-are', 31),
    (51, 'Amiga da Minha Mulher', 248, 'https://stream.mediaplayer.app/tracks/amiga-da-minha-mulher', 32),
    (52, 'Burguesinha', 262, 'https://stream.mediaplayer.app/tracks/burguesinha', 32),
    (53, 'Get Lucky', 369, 'https://stream.mediaplayer.app/tracks/get-lucky', 33),
    (54, 'Instant Crush', 337, 'https://stream.mediaplayer.app/tracks/instant-crush', 33),
    (55, 'One More Time', 320, 'https://stream.mediaplayer.app/tracks/one-more-time', 34),
    (56, 'Harder, Better, Faster, Stronger', 224, 'https://stream.mediaplayer.app/tracks/hbfs', 34),
    (57, 'You Don''t Know Me', 228, 'https://stream.mediaplayer.app/tracks/you-dont-know-me', 35),
    (58, 'Dreams', 257, 'https://stream.mediaplayer.app/tracks/dreams', 36),
    (59, 'The Chain', 270, 'https://stream.mediaplayer.app/tracks/the-chain', 36),
    (60, 'cardigan', 239, 'https://stream.mediaplayer.app/tracks/cardigan', 37),
    (61, 'august', 261, 'https://stream.mediaplayer.app/tracks/august', 37),
    (62, 'My Universe', 228, 'https://stream.mediaplayer.app/tracks/my-universe', 38),
    (63, 'Anti-Hero', 200, 'https://stream.mediaplayer.app/tracks/anti-hero', 6),
    (64, 'Lavender Haze', 202, 'https://stream.mediaplayer.app/tracks/lavender-haze', 6),
    (65, 'Friday I''m in Love', 215, 'https://stream.mediaplayer.app/tracks/friday-im-in-love', 20),
    (66, 'Believer', 204, 'https://stream.mediaplayer.app/tracks/believer', 10)
ON CONFLICT (id_musica) DO NOTHING;

-- ====================================
-- 4. USUÁRIOS (IDs 7..14)
-- ====================================
INSERT INTO USUARIO (id_usuario, nome, email, senha) VALUES
    (7, 'Lucas Ferreira', 'lucas.ferreira@email.com', 'hash_lucas_2026'),
    (8, 'Beatriz Almeida', 'beatriz.almeida@email.com', 'hash_bea_2026'),
    (9, 'Rafael Souza', 'rafael.souza@email.com', 'hash_rafa_2026'),
    (10, 'Camila Rocha', 'camila.rocha@email.com', 'hash_cami_2026'),
    (11, 'Matheus Lima', 'matheus.lima@email.com', 'hash_mat_2026'),
    (12, 'Larissa Mendes', 'larissa.mendes@email.com', 'hash_lari_2026'),
    (13, 'Bruno Carvalho', 'bruno.carvalho@email.com', 'hash_bruno_2026'),
    (14, 'Fernanda Dias', 'fernanda.dias@email.com', 'hash_fer_2026')
ON CONFLICT (id_usuario) DO NOTHING;

-- ====================================
-- 5. PLAYLISTS TEMÁTICAS (IDs 6..15)
-- ====================================
INSERT INTO PLAYLIST (id_playlist, nome_playlist, data_criacao, id_usuario) VALUES
    (6, 'Clássicos da MPB', CURRENT_DATE - INTERVAL '45 days', 5),
    (7, 'Indie & Alternativo', CURRENT_DATE - INTERVAL '32 days', 7),
    (8, 'Churrasco de Domingo', CURRENT_DATE - INTERVAL '25 days', 9),
    (9, 'Foco & Programação', CURRENT_DATE - INTERVAL '19 days', 8),
    (10, 'Rock Nacional & Gringo', CURRENT_DATE - INTERVAL '14 days', 11),
    (11, 'Pista Eletrônica', CURRENT_DATE - INTERVAL '11 days', 10),
    (12, 'Tarde Tranquila', CURRENT_DATE - INTERVAL '8 days', 12),
    (13, 'Vibe Noturna', CURRENT_DATE - INTERVAL '5 days', 13),
    (14, 'Descobertas da Semana', CURRENT_DATE - INTERVAL '3 days', 6),
    (15, 'Road Trip 2026', CURRENT_DATE - INTERVAL '1 day', 14)
ON CONFLICT (id_playlist) DO NOTHING;

-- ====================================
-- 6. FAIXAS DAS PLAYLISTS
-- ====================================
INSERT INTO PLAYLIST_MUSICA (id_playlist, id_musica, data_adicao) VALUES
    -- Complemento nas playlists iniciais
    (1, 42, CURRENT_DATE - INTERVAL '6 days'),
    (1, 58, CURRENT_DATE - INTERVAL '4 days'),
    (2, 43, CURRENT_DATE - INTERVAL '10 days'),
    (2, 49, CURRENT_DATE - INTERVAL '9 days'),
    (3, 55, CURRENT_DATE - INTERVAL '7 days'),
    (3, 66, CURRENT_DATE - INTERVAL '5 days'),
    (5, 47, CURRENT_DATE - INTERVAL '4 days'),
    (5, 63, CURRENT_DATE - INTERVAL '2 days'),

    -- Playlist 6: Clássicos da MPB
    (6, 18, CURRENT_DATE - INTERVAL '44 days'),
    (6, 19, CURRENT_DATE - INTERVAL '44 days'),
    (6, 20, CURRENT_DATE - INTERVAL '40 days'),
    (6, 27, CURRENT_DATE - INTERVAL '38 days'),
    (6, 38, CURRENT_DATE - INTERVAL '35 days'),
    (6, 39, CURRENT_DATE - INTERVAL '30 days'),
    (6, 45, CURRENT_DATE - INTERVAL '25 days'),
    (6, 57, CURRENT_DATE - INTERVAL '20 days'),

    -- Playlist 7: Indie & Alternativo
    (7, 34, CURRENT_DATE - INTERVAL '31 days'),
    (7, 35, CURRENT_DATE - INTERVAL '31 days'),
    (7, 36, CURRENT_DATE - INTERVAL '29 days'),
    (7, 37, CURRENT_DATE - INTERVAL '27 days'),
    (7, 60, CURRENT_DATE - INTERVAL '20 days'),
    (7, 61, CURRENT_DATE - INTERVAL '18 days'),
    (7, 65, CURRENT_DATE - INTERVAL '15 days'),

    -- Playlist 8: Churrasco de Domingo
    (8, 22, CURRENT_DATE - INTERVAL '24 days'),
    (8, 23, CURRENT_DATE - INTERVAL '24 days'),
    (8, 45, CURRENT_DATE - INTERVAL '22 days'),
    (8, 46, CURRENT_DATE - INTERVAL '22 days'),
    (8, 51, CURRENT_DATE - INTERVAL '21 days'),
    (8, 52, CURRENT_DATE - INTERVAL '21 days'),

    -- Playlist 9: Foco & Programação
    (9, 1, CURRENT_DATE - INTERVAL '18 days'),
    (9, 3, CURRENT_DATE - INTERVAL '18 days'),
    (9, 53, CURRENT_DATE - INTERVAL '17 days'),
    (9, 54, CURRENT_DATE - INTERVAL '16 days'),
    (9, 56, CURRENT_DATE - INTERVAL '15 days'),
    (9, 58, CURRENT_DATE - INTERVAL '14 days'),

    -- Playlist 10: Rock Nacional & Gringo
    (10, 4, CURRENT_DATE - INTERVAL '13 days'),
    (10, 31, CURRENT_DATE - INTERVAL '13 days'),
    (10, 32, CURRENT_DATE - INTERVAL '12 days'),
    (10, 33, CURRENT_DATE - INTERVAL '12 days'),
    (10, 43, CURRENT_DATE - INTERVAL '10 days'),
    (10, 49, CURRENT_DATE - INTERVAL '9 days'),
    (10, 50, CURRENT_DATE - INTERVAL '9 days'),
    (10, 59, CURRENT_DATE - INTERVAL '8 days'),

    -- Playlist 11: Pista Eletrônica
    (11, 40, CURRENT_DATE - INTERVAL '10 days'),
    (11, 47, CURRENT_DATE - INTERVAL '10 days'),
    (11, 48, CURRENT_DATE - INTERVAL '9 days'),
    (11, 53, CURRENT_DATE - INTERVAL '8 days'),
    (11, 55, CURRENT_DATE - INTERVAL '8 days'),
    (11, 56, CURRENT_DATE - INTERVAL '7 days'),

    -- Playlist 12: Tarde Tranquila
    (12, 5, CURRENT_DATE - INTERVAL '7 days'),
    (12, 11, CURRENT_DATE - INTERVAL '7 days'),
    (12, 18, CURRENT_DATE - INTERVAL '6 days'),
    (12, 41, CURRENT_DATE - INTERVAL '6 days'),
    (12, 44, CURRENT_DATE - INTERVAL '5 days'),
    (12, 57, CURRENT_DATE - INTERVAL '4 days'),

    -- Playlist 13: Vibe Noturna
    (13, 24, CURRENT_DATE - INTERVAL '5 days'),
    (13, 34, CURRENT_DATE - INTERVAL '4 days'),
    (13, 36, CURRENT_DATE - INTERVAL '4 days'),
    (13, 41, CURRENT_DATE - INTERVAL '3 days'),
    (13, 54, CURRENT_DATE - INTERVAL '2 days'),

    -- Playlist 14: Descobertas da Semana
    (14, 42, CURRENT_DATE - INTERVAL '3 days'),
    (14, 62, CURRENT_DATE - INTERVAL '2 days'),
    (14, 63, CURRENT_DATE - INTERVAL '2 days'),
    (14, 64, CURRENT_DATE - INTERVAL '1 day'),

    -- Playlist 15: Road Trip 2026
    (15, 16, CURRENT_DATE - INTERVAL '1 day'),
    (15, 17, CURRENT_DATE - INTERVAL '1 day'),
    (15, 29, CURRENT_DATE - INTERVAL '1 day'),
    (15, 58, CURRENT_DATE),
    (15, 59, CURRENT_DATE),
    (15, 65, CURRENT_DATE)
ON CONFLICT (id_playlist, id_musica) DO NOTHING;

-- ====================================
-- 7. HISTÓRICO DE REPRODUÇÃO RECENTE (últimos 7 dias)
-- ====================================
INSERT INTO HISTORICO_REPRODUCAO (id_usuario, id_musica, data_hora_reproducao) VALUES
    -- Há 6 dias
    (7, 34, (CURRENT_DATE - INTERVAL '6 days') + TIME '09:15:00'),
    (7, 35, (CURRENT_DATE - INTERVAL '6 days') + TIME '09:20:00'),
    (7, 36, (CURRENT_DATE - INTERVAL '6 days') + TIME '09:25:00'),
    (8, 53, (CURRENT_DATE - INTERVAL '6 days') + TIME '14:10:00'),
    (8, 54, (CURRENT_DATE - INTERVAL '6 days') + TIME '14:17:00'),
    (9, 51, (CURRENT_DATE - INTERVAL '6 days') + TIME '19:40:00'),
    (9, 45, (CURRENT_DATE - INTERVAL '6 days') + TIME '19:45:00'),

    -- Há 5 dias
    (1, 42, (CURRENT_DATE - INTERVAL '5 days') + TIME '08:30:00'),
    (1, 58, (CURRENT_DATE - INTERVAL '5 days') + TIME '08:35:00'),
    (10, 47, (CURRENT_DATE - INTERVAL '5 days') + TIME '18:00:00'),
    (10, 48, (CURRENT_DATE - INTERVAL '5 days') + TIME '18:04:00'),
    (10, 55, (CURRENT_DATE - INTERVAL '5 days') + TIME '18:09:00'),
    (11, 31, (CURRENT_DATE - INTERVAL '5 days') + TIME '21:15:00'),
    (11, 43, (CURRENT_DATE - INTERVAL '5 days') + TIME '21:21:00'),
    (11, 49, (CURRENT_DATE - INTERVAL '5 days') + TIME '21:28:00'),

    -- Há 4 dias
    (2, 66, (CURRENT_DATE - INTERVAL '4 days') + TIME '07:10:00'),
    (2, 13, (CURRENT_DATE - INTERVAL '4 days') + TIME '07:14:00'),
    (3, 60, (CURRENT_DATE - INTERVAL '4 days') + TIME '20:00:00'),
    (3, 61, (CURRENT_DATE - INTERVAL '4 days') + TIME '20:05:00'),
    (5, 38, (CURRENT_DATE - INTERVAL '4 days') + TIME '16:20:00'),
    (5, 39, (CURRENT_DATE - INTERVAL '4 days') + TIME '16:27:00'),
    (12, 44, (CURRENT_DATE - INTERVAL '4 days') + TIME '17:50:00'),

    -- Há 3 dias
    (4, 63, (CURRENT_DATE - INTERVAL '3 days') + TIME '11:05:00'),
    (4, 64, (CURRENT_DATE - INTERVAL '3 days') + TIME '11:09:00'),
    (6, 42, (CURRENT_DATE - INTERVAL '3 days') + TIME '15:30:00'),
    (7, 34, (CURRENT_DATE - INTERVAL '3 days') + TIME '22:10:00'),
    (7, 65, (CURRENT_DATE - INTERVAL '3 days') + TIME '22:15:00'),
    (8, 56, (CURRENT_DATE - INTERVAL '3 days') + TIME '10:00:00'),
    (8, 53, (CURRENT_DATE - INTERVAL '3 days') + TIME '10:05:00'),
    (13, 34, (CURRENT_DATE - INTERVAL '3 days') + TIME '23:12:00'),
    (13, 41, (CURRENT_DATE - INTERVAL '3 days') + TIME '23:18:00'),

    -- Há 2 dias
    (1, 1, (CURRENT_DATE - INTERVAL '2 days') + TIME '09:00:00'),
    (1, 29, (CURRENT_DATE - INTERVAL '2 days') + TIME '09:05:00'),
    (5, 18, (CURRENT_DATE - INTERVAL '2 days') + TIME '13:45:00'),
    (5, 45, (CURRENT_DATE - INTERVAL '2 days') + TIME '13:50:00'),
    (9, 52, (CURRENT_DATE - INTERVAL '2 days') + TIME '18:20:00'),
    (11, 31, (CURRENT_DATE - INTERVAL '2 days') + TIME '19:00:00'),
    (11, 32, (CURRENT_DATE - INTERVAL '2 days') + TIME '19:06:00'),
    (11, 33, (CURRENT_DATE - INTERVAL '2 days') + TIME '19:11:00'),
    (14, 58, (CURRENT_DATE - INTERVAL '2 days') + TIME '20:30:00'),
    (14, 59, (CURRENT_DATE - INTERVAL '2 days') + TIME '20:35:00'),

    -- Ontem
    (1, 42, (CURRENT_DATE - INTERVAL '1 day') + TIME '08:15:00'),
    (1, 62, (CURRENT_DATE - INTERVAL '1 day') + TIME '08:20:00'),
    (2, 55, (CURRENT_DATE - INTERVAL '1 day') + TIME '07:30:00'),
    (2, 66, (CURRENT_DATE - INTERVAL '1 day') + TIME '07:36:00'),
    (7, 34, (CURRENT_DATE - INTERVAL '1 day') + TIME '17:40:00'),
    (7, 36, (CURRENT_DATE - INTERVAL '1 day') + TIME '17:45:00'),
    (8, 53, (CURRENT_DATE - INTERVAL '1 day') + TIME '14:00:00'),
    (8, 54, (CURRENT_DATE - INTERVAL '1 day') + TIME '14:07:00'),
    (10, 47, (CURRENT_DATE - INTERVAL '1 day') + TIME '21:00:00'),
    (10, 40, (CURRENT_DATE - INTERVAL '1 day') + TIME '21:04:00'),
    (12, 18, (CURRENT_DATE - INTERVAL '1 day') + TIME '16:15:00'),
    (13, 43, (CURRENT_DATE - INTERVAL '1 day') + TIME '22:45:00'),

    -- Hoje
    (1, 3, CURRENT_DATE + TIME '08:10:00'),
    (1, 29, CURRENT_DATE + TIME '08:16:00'),
    (1, 42, CURRENT_DATE + TIME '08:22:00'),
    (7, 34, CURRENT_DATE + TIME '09:05:00'),
    (7, 35, CURRENT_DATE + TIME '09:10:00'),
    (8, 53, CURRENT_DATE + TIME '10:30:00'),
    (8, 56, CURRENT_DATE + TIME '10:37:00'),
    (11, 43, CURRENT_DATE + TIME '11:15:00'),
    (11, 31, CURRENT_DATE + TIME '11:22:00'),
    (14, 58, CURRENT_DATE + TIME '12:05:00'),
    (14, 65, CURRENT_DATE + TIME '12:11:00')
ON CONFLICT (id_usuario, id_musica, data_hora_reproducao) DO NOTHING;

-- ====================================
-- 8. SINCRONIZAR SEQUENCES DO POSTGRESQL
-- ====================================
SELECT setval('artista_id_artista_seq', (SELECT COALESCE(MAX(id_artista), 1) FROM ARTISTA));
SELECT setval('album_id_album_seq', (SELECT COALESCE(MAX(id_album), 1) FROM ALBUM));
SELECT setval('musica_id_musica_seq', (SELECT COALESCE(MAX(id_musica), 1) FROM MUSICA));
SELECT setval('usuario_id_usuario_seq', (SELECT COALESCE(MAX(id_usuario), 1) FROM USUARIO));
SELECT setval('playlist_id_playlist_seq', (SELECT COALESCE(MAX(id_playlist), 1) FROM PLAYLIST));

-- ====================================
-- 9. ATUALIZAÇÕES PARA EXERCITAR O TRIGGER DE AUDITORIA
-- ====================================
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM AUDITORIA_USUARIO) THEN
        UPDATE USUARIO
        SET nome = 'Gabriela Monteiro', email = 'gabriela.monteiro@email.com'
        WHERE id_usuario = 5;

        UPDATE USUARIO
        SET nome = 'Rita de Cássia', email = 'rita.cassia@email.com'
        WHERE id_usuario = 6;
    END IF;
END $$;

COMMIT;
