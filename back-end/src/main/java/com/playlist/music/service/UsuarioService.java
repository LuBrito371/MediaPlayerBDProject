package com.playlist.music.service;

import java.util.List;

import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.playlist.music.entities.Usuario;
import com.playlist.music.exception.BusinessValidationException;
import com.playlist.music.exception.ResourceNotFoundException;
import com.playlist.music.repository.UsuarioRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class UsuarioService {

    private final UsuarioRepository repository;

    public List<Usuario> listar() {
        return repository.findAll(Sort.by(Sort.Direction.ASC, "idUsuario"));
    }

    public Usuario buscarPorId(Integer id) {
        return repository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Usuário não encontrado com ID: " + id));
    }

    @Transactional
    public Usuario salvar(Usuario usuario) {
        if (usuario == null || usuario.getNome() == null || usuario.getNome().isBlank()) {
            throw new BusinessValidationException("O nome do usuário é obrigatório.");
        }
        if (usuario.getEmail() == null || usuario.getEmail().isBlank()) {
            throw new BusinessValidationException("O e-mail do usuário é obrigatório.");
        }
        if (usuario.getSenha() == null || usuario.getSenha().isBlank()) {
            throw new BusinessValidationException("A senha do usuário é obrigatória.");
        }
        String emailLimpo = usuario.getEmail().trim().toLowerCase();
        if (repository.existsByEmail(emailLimpo)) {
            throw new BusinessValidationException("Já existe um usuário cadastrado com este e-mail.");
        }
        usuario.setNome(usuario.getNome().trim());
        usuario.setEmail(emailLimpo);
        return repository.save(usuario);
    }

    @Transactional
    public Usuario atualizar(Integer id, Usuario dados) {
        Usuario existente = buscarPorId(id);
        if (dados.getNome() == null || dados.getNome().isBlank()) {
            throw new BusinessValidationException("O nome do usuário é obrigatório.");
        }
        if (dados.getEmail() == null || dados.getEmail().isBlank()) {
            throw new BusinessValidationException("O e-mail do usuário é obrigatório.");
        }
        String emailLimpo = dados.getEmail().trim().toLowerCase();
        if (repository.existsByEmailAndIdUsuarioNot(emailLimpo, id)) {
            throw new BusinessValidationException("Já existe outro usuário cadastrado com este e-mail.");
        }

        existente.setNome(dados.getNome().trim());
        existente.setEmail(emailLimpo);
        if (dados.getSenha() != null && !dados.getSenha().isBlank()) {
            existente.setSenha(dados.getSenha());
        }

        return repository.save(existente);
    }

    @Transactional
    public void deletar(Integer id) {
        if (!repository.existsById(id)) {
            throw new ResourceNotFoundException("Usuário não encontrado com ID: " + id);
        }
        repository.deleteById(id);
    }
}
