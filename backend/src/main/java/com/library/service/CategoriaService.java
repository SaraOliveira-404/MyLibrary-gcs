package com.library.service;

import com.library.dto.request.CategoriaRequestDTO;
import com.library.dto.response.CategoriaResponseDTO;
import com.library.exception.BusinessException;
import com.library.exception.NotFoundException;
import com.library.model.Categoria;
import com.library.repository.CategoriaRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class CategoriaService {

    private final CategoriaRepository categoriaRepository;

    public CategoriaService(CategoriaRepository categoriaRepository) {
        this.categoriaRepository = categoriaRepository;
    }

    @Transactional(readOnly = true)
    public List<CategoriaResponseDTO> listarTodas() {
        return categoriaRepository.findAll()
                .stream()
                .map(this::toResponseDTO)
                .toList();
    }

    @Transactional
    public CategoriaResponseDTO criar(CategoriaRequestDTO request) {
        if (categoriaRepository.existsByNome(request.getNome())) {
            throw new BusinessException("Já existe uma categoria cadastrada com este nome.");
        }

        Categoria categoria = new Categoria();
        categoria.setNome(request.getNome());
        categoria.setDescricao(request.getDescricao());

        Categoria salva = categoriaRepository.save(categoria);

        return toResponseDTO(salva);
    }

    @Transactional
    public void excluir(Long id) {
        Categoria categoria = categoriaRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Categoria não encontrada com o ID informado."));

        if (categoria.getLivros() != null && !categoria.getLivros().isEmpty()) {
            throw new BusinessException("Não é possível excluir uma categoria que possui livros vinculados.");
        }

        categoriaRepository.delete(categoria);
    }
    

    private CategoriaResponseDTO toResponseDTO(Categoria categoria) {
        CategoriaResponseDTO dto = new CategoriaResponseDTO();

        dto.setId(categoria.getId());
        dto.setNome(categoria.getNome());
        dto.setDescricao(categoria.getDescricao());
        dto.setQuantidadeLivros(categoria.getLivros() != null ? categoria.getLivros().size() : 0);

        return dto;
    }
    
}
