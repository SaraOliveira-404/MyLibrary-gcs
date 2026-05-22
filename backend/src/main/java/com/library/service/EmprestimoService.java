package com.library.service;

import com.library.dto.request.EmprestimoRequestDTO;
import com.library.dto.response.EmprestimoResponseDTO;
import com.library.exception.BusinessException;
import com.library.exception.NotFoundException;
import com.library.model.Emprestimo;
import com.library.model.Livro;
import com.library.model.StatusLivro;
import com.library.repository.EmprestimoRepository;
import com.library.repository.LivroRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.List;

@Service
public class EmprestimoService {

    private final EmprestimoRepository emprestimoRepository;
    private final LivroRepository livroRepository;

    public EmprestimoService(EmprestimoRepository emprestimoRepository, LivroRepository livroRepository) {
        this.emprestimoRepository = emprestimoRepository;
        this.livroRepository = livroRepository;
    }

    @Transactional(readOnly = true)
    public List<EmprestimoResponseDTO> listarTodos() {
        return emprestimoRepository.findAll()
                .stream()
                .map(this::toResponseDTO)
                .toList();
    }

    @Transactional(readOnly = true)
    public List<EmprestimoResponseDTO> listarAtivos() {
        return emprestimoRepository.findByDataDevolucaoEfetivaIsNull()
                .stream()
                .map(this::toResponseDTO)
                .toList();
    }

    @Transactional(readOnly = true)
    public List<EmprestimoResponseDTO> listarAtrasados() {
        return emprestimoRepository
                .findByDataDevolucaoPrevistaBeforeAndDataDevolucaoEfetivaIsNull(LocalDate.now())
                .stream()
                .map(this::toResponseDTO)
                .toList();
    }

    @Transactional
    public EmprestimoResponseDTO emprestar(EmprestimoRequestDTO dto) {
        Livro livro = livroRepository.findById(dto.getLivroId())
                .orElseThrow(() -> new NotFoundException("Livro não encontrado"));

        if (livro.getStatus() == StatusLivro.EMPRESTADO) {
            throw new BusinessException("Este livro já está emprestado");
        }

        Emprestimo emprestimo = new Emprestimo();
        emprestimo.setLivro(livro);
        emprestimo.setNomePessoa(dto.getNomePessoa());
        emprestimo.setTelefone(dto.getTelefone());
        emprestimo.setDataEmprestimo(LocalDate.now());
        emprestimo.setDataDevolucaoPrevista(dto.getDataDevolucaoPrevista());

        livro.setStatus(StatusLivro.EMPRESTADO);
        livroRepository.save(livro);

        return toResponseDTO(emprestimoRepository.save(emprestimo));
    }

    @Transactional
    public EmprestimoResponseDTO devolver(Long emprestimoId) {
        Emprestimo emprestimo = emprestimoRepository.findById(emprestimoId)
                .orElseThrow(() -> new NotFoundException("Empréstimo não encontrado"));

        if (emprestimo.getDataDevolucaoEfetiva() != null) {
            throw new BusinessException("Este empréstimo já foi devolvido");
        }

        Livro livro = emprestimo.getLivro();

        if (livro.getStatus() == StatusLivro.DISPONIVEL) {
            throw new BusinessException("Este livro já está disponível");
        }

        emprestimo.setDataDevolucaoEfetiva(LocalDate.now());
        livro.setStatus(StatusLivro.DISPONIVEL);

        livroRepository.save(livro);

        return toResponseDTO(emprestimoRepository.save(emprestimo));
    }

    private EmprestimoResponseDTO toResponseDTO(Emprestimo emprestimo) {
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
                    ChronoUnit.DAYS.between(emprestimo.getDataDevolucaoPrevista(), LocalDate.now())
            );
        } else {
            dto.setDiasAtraso(0);
        }

        return dto;
    }
}
