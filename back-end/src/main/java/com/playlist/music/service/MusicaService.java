package com.playlist.music.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.playlist.music.entities.Album;
import com.playlist.music.entities.Musica;
import com.playlist.music.entities.Playlist;
import com.playlist.music.repository.MusicaRepository;
import com.playlist.music.repository.AlbumRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class MusicaService {

    private  final MusicaRepository repository;
    private  final AlbumRepository albumRepository;
    
    
    public List<Musica> listar() {
        return repository.findAll();
    }

    public Musica salvar(Musica musica) {

        if (musica.getAlbum() == null || musica.getAlbum().getIdAlbum() == null) {
            throw new RuntimeException("Álbum é obrigatório");
        }
        Integer albumId = musica.getAlbum().getIdAlbum();

        Album album = albumRepository.findById(albumId)
                .orElseThrow(() -> new RuntimeException("Album não encontrado"));

        musica.setAlbum(album);

        return repository.save(musica);
    }
    
    public Musica buscarPorId(Integer id) {
        return repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Música não encontrado"));
    }

    public void deletar(Integer id) {
        repository.deleteById(id);
    }
}