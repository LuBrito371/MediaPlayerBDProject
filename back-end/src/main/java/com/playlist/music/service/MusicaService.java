package com.playlist.music.service;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.playlist.music.entities.Album;
import com.playlist.music.entities.Musica;
import com.playlist.music.exception.BusinessValidationException;
import com.playlist.music.exception.ResourceNotFoundException;
import com.playlist.music.repository.AlbumRepository;
import com.playlist.music.repository.MusicaRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class MusicaService {

    private final MusicaRepository repository;
    private final AlbumRepository albumRepository;

    public List<Musica> listar() {
        return repository.findAll();
    }

    public Musica buscarPorId(Integer id) {
        return repository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Música não encontrada com ID: " + id));
    }

    @Transactional
    public Musica salvar(Musica musica) {
        Album album = resolverAlbum(musica);
        validarCampos(musica);
        musica.setAlbum(album);
        return repository.save(musica);
    }

    @Transactional
    public Musica atualizar(Integer id, Musica dados) {
        Musica existente = buscarPorId(id);
        Album album = resolverAlbum(dados);
        validarCampos(dados);

        existente.setTitulo(dados.getTitulo().trim());
        existente.setDuracao(dados.getDuracao());
        existente.setUrlMusica(dados.getUrlMusica().trim());
        existente.setAlbum(album);

        return repository.save(existente);
    }

    @Transactional
    public void deletar(Integer id) {
        if (!repository.existsById(id)) {
            throw new ResourceNotFoundException("Música não encontrada com ID: " + id);
        }
        repository.deleteById(id);
    }

    private Album resolverAlbum(Musica musica) {
        if (musica == null || musica.getAlbum() == null || musica.getAlbum().getIdAlbum() == null) {
            throw new BusinessValidationException("O álbum da música é obrigatório.");
        }
        Integer albumId = musica.getAlbum().getIdAlbum();
        return albumRepository.findById(albumId)
                .orElseThrow(() -> new ResourceNotFoundException("Álbum não encontrado com ID: " + albumId));
    }

    private void validarCampos(Musica musica) {
        if (musica.getTitulo() == null || musica.getTitulo().isBlank()) {
            throw new BusinessValidationException("O título da música é obrigatório.");
        }
        if (musica.getDuracao() == null || musica.getDuracao() <= 0) {
            throw new BusinessValidationException("A duração da música deve ser maior que zero.");
        }
        if (musica.getUrlMusica() == null || musica.getUrlMusica().isBlank()) {
            musica.setUrlMusica("http://musica/" + musica.getTitulo().trim().toLowerCase().replaceAll("\\s+", "_"));
        }
        musica.setTitulo(musica.getTitulo().trim());
        musica.setUrlMusica(musica.getUrlMusica().trim());
    }
}
