package com.playlist.music.service;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.playlist.music.entities.Album;
import com.playlist.music.entities.Artista;
import com.playlist.music.exception.BusinessValidationException;
import com.playlist.music.exception.ResourceNotFoundException;
import com.playlist.music.repository.AlbumRepository;
import com.playlist.music.repository.ArtistaRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class AlbumService {

    private final AlbumRepository repository;
    private final ArtistaRepository artistaRepository;

    public List<Album> listar() {
        return repository.findAll();
    }

    public Album buscarPorId(Integer id) {
        return repository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Álbum não encontrado com ID: " + id));
    }

    @Transactional
    public Album salvar(Album album) {
        Artista artista = resolverArtista(album);
        validarCampos(album);
        album.setArtista(artista);
        return repository.save(album);
    }

    @Transactional
    public Album atualizar(Integer id, Album dados) {
        Album existente = buscarPorId(id);
        Artista artista = resolverArtista(dados);
        validarCampos(dados);

        existente.setTitulo(dados.getTitulo().trim());
        existente.setAnoLancamento(dados.getAnoLancamento());
        existente.setGenero(dados.getGenero().trim());
        existente.setArtista(artista);

        return repository.save(existente);
    }

    @Transactional
    public void deletar(Integer id) {
        if (!repository.existsById(id)) {
            throw new ResourceNotFoundException("Álbum não encontrado com ID: " + id);
        }
        repository.deleteById(id);
    }

    private Artista resolverArtista(Album album) {
        if (album == null || album.getArtista() == null || album.getArtista().getIdArtista() == null) {
            throw new BusinessValidationException("O artista do álbum é obrigatório.");
        }
        Integer artistaId = album.getArtista().getIdArtista();
        return artistaRepository.findById(artistaId)
                .orElseThrow(() -> new ResourceNotFoundException("Artista não encontrado com ID: " + artistaId));
    }

    private void validarCampos(Album album) {
        if (album.getTitulo() == null || album.getTitulo().isBlank()) {
            throw new BusinessValidationException("O título do álbum é obrigatório.");
        }
        if (album.getAnoLancamento() == null || album.getAnoLancamento() < 1900) {
            throw new BusinessValidationException("Informe um ano de lançamento válido.");
        }
        if (album.getGenero() == null || album.getGenero().isBlank()) {
            throw new BusinessValidationException("O gênero do álbum é obrigatório.");
        }
        album.setTitulo(album.getTitulo().trim());
        album.setGenero(album.getGenero().trim());
    }
}
