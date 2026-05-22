package com.library.service;

import com.library.dto.request.LivroRequestDTO;
//import com.library.dto.response.EmprestimoResponseDTO;
import com.library.dto.response.LivroResponseDTO;
import com.library.exception.BusinessException;
import com.library.exception.NotFoundException;
import com.library.model.Categoria;
//import com.library.model.Emprestimo;
import com.library.model.Livro;
import com.library.model.StatusLivro;
import com.library.repository.CategoriaRepository;
//import com.library.repository.EmprestimoRepository;
import com.library.repository.LivroRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.List;

@Service
public class LivroService {

    private final LivroRepository livroRepository;
    private final CategoriaRepository categoriaRepository;
    //private final EmprestimoRepository emprestimoRepository;

    public LivroService(
            LivroRepository livroRepository,
            CategoriaRepository categoriaRepository
            //EmprestimoRepository emprestimoRepository
    ) {
        this.livroRepository = livroRepository;
        this.categoriaRepository = categoriaRepository;
        //this.emprestimoRepository = emprestimoRepository;
    }

    @Transactional
    public LivroResponseDTO cadastrar(LivroRequestDTO dto) {
        Categoria categoria = categoriaRepository.findById(dto.getCategoriaId())
                .orElseThrow(() -> new NotFoundException("Categoria não encontrada"));

        Livro livro = new Livro();
        livro.setTitulo(dto.getTitulo());
        livro.setAutor(dto.getAutor());
        livro.setIsbn(dto.getIsbn());
        livro.setAno(dto.getAno());
        livro.setCategoria(categoria);
        livro.setStatus(StatusLivro.DISPONIVEL);

        return toLivroResponseDTO(livroRepository.save(livro));
    }

    @Transactional(readOnly = true)
    public List<LivroResponseDTO> listarTodos() {
        return livroRepository.findAll()
                .stream()
                .map(this::toLivroResponseDTO)
                .toList();
    }

    @Transactional(readOnly = true)
    public LivroResponseDTO buscarPorId(Long id) {
        return toLivroResponseDTO(buscarLivroEntidade(id));
    }

    @Transactional(readOnly = true)
    public LivroResponseDTO buscarPorIsbn(String isbn) {
        Livro livro = livroRepository.findByIsbn(isbn)
                .orElseThrow(() -> new NotFoundException("Livro não encontrado com este ISBN"));

        return toLivroResponseDTO(livro);
    }

    @Transactional
    public LivroResponseDTO atualizar(Long id, LivroRequestDTO dto) {
        Livro livro = buscarLivroEntidade(id);

        Categoria categoria = categoriaRepository.findById(dto.getCategoriaId())
                .orElseThrow(() -> new NotFoundException("Categoria não encontrada"));

        livro.setTitulo(dto.getTitulo());
        livro.setAutor(dto.getAutor());
        livro.setIsbn(dto.getIsbn());
        livro.setAno(dto.getAno());
        livro.setCategoria(categoria);

        return toLivroResponseDTO(livroRepository.save(livro));
    }

    @Transactional(readOnly = true)
    public List<LivroResponseDTO> filtrar(Long categoriaId, StatusLivro status, String termo) {
        if (termo != null && termo.isBlank()) {
            termo = null;
        }

        return livroRepository.filtrarLivros(categoriaId, status, termo)
                .stream()
                .map(this::toLivroResponseDTO)
                .toList();
    }

    @Transactional(readOnly = true)
    public List<LivroResponseDTO> buscarPorTituloOuAutor(String termo) {
        if (termo == null || termo.isBlank()) {
            return listarTodos();
        }

        return livroRepository.searchByTituloOrAutor(termo)
                .stream()
                .map(this::toLivroResponseDTO)
                .toList();
    }

    @Transactional
    public void excluir(Long id) {
        Livro livro = buscarLivroEntidade(id);

        if (livro.getStatus() == StatusLivro.EMPRESTADO) {
            throw new BusinessException("Não é possível excluir um livro emprestado");
        }

        livroRepository.delete(livro);
    }

    /*@Transactional(readOnly = true)
    public List<EmprestimoResponseDTO> historicoEmprestimos(Long livroId) {
        if (!livroRepository.existsById(livroId)) {
            throw new NotFoundException("Livro não encontrado");
        }

        return emprestimoRepository.findByLivroId(livroId)
                .stream()
                .map(this::toEmprestimoResponseDTO)
                .toList();
    }*/

    private Livro buscarLivroEntidade(Long id) {
        return livroRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Livro não encontrado"));
    }

    private LivroResponseDTO toLivroResponseDTO(Livro livro) {
        LivroResponseDTO dto = new LivroResponseDTO();

        dto.setId(livro.getId());
        dto.setTitulo(livro.getTitulo());
        dto.setAutor(livro.getAutor());
        dto.setIsbn(livro.getIsbn());
        dto.setAno(livro.getAno());
        dto.setStatus(livro.getStatus());

        if (livro.getCategoria() != null) {
            dto.setCategoria(livro.getCategoria().getNome());
        }

        return dto;
    }

    /*private EmprestimoResponseDTO toEmprestimoResponseDTO(Emprestimo emprestimo) {
        EmprestimoResponseDTO dto = new EmprestimoResponseDTO();

        dto.setId(emprestimo.getId());
        dto.setNomePessoa(emprestimo.getNomePessoa());
        dto.setTelefone(emprestimo.getTelefone());
        dto.setDataEmprestimo(emprestimo.getDataEmprestimo());
        dto.setDataDevolucaoPrevista(emprestimo.getDataDevolucaoPrevista());
        dto.setDataDevolucaoEfetiva(emprestimo.getDataDevolucaoEfetiva());

        if (emprestimo.getLivro() != null) {
            dto.setLivroId(emprestimo.getLivro().getId());
            dto.setLivroTitulo(emprestimo.getLivro().getTitulo());
        }

        boolean atrasado = emprestimo.getDataDevolucaoEfetiva() == null
                && emprestimo.getDataDevolucaoPrevista().isBefore(LocalDate.now());

        dto.setAtrasado(atrasado);

        if (atrasado) {
            dto.setDiasAtraso(
                    ChronoUnit.DAYS.between(
                            emprestimo.getDataDevolucaoPrevista(),
                            LocalDate.now()
                    )
            );
        } else {
            dto.setDiasAtraso(0);
        }

        return dto;
    }*/
}
