package com.library.service;

import com.library.dto.response.DashboardResponseDTO;
import com.library.dto.response.EmprestimoResponseDTO;
import com.library.model.Emprestimo;
import com.library.model.StatusLivro;
import com.library.repository.EmprestimoRepository;
import com.library.repository.LivroRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.List;

@Service
public class DashboardService {

    private final LivroRepository livroRepository;
    private final EmprestimoRepository emprestimoRepository;

    public DashboardService(LivroRepository livroRepository, EmprestimoRepository emprestimoRepository) {
        this.livroRepository = livroRepository;
        this.emprestimoRepository = emprestimoRepository;
    }

    @Transactional(readOnly = true)
    public DashboardResponseDTO buscarDados() {
        DashboardResponseDTO dto = new DashboardResponseDTO();

        dto.setTotalLivros(livroRepository.count());
        dto.setTotalDisponiveis(livroRepository.countByStatus(StatusLivro.DISPONIVEL));
        dto.setTotalEmprestados(livroRepository.countByStatus(StatusLivro.EMPRESTADO));
        dto.setTotalEmprestimosAtivos(emprestimoRepository.countByDataDevolucaoEfetivaIsNull());
        dto.setTotalAtrasados(
                emprestimoRepository.countByDataDevolucaoPrevistaBeforeAndDataDevolucaoEfetivaIsNull(LocalDate.now())
        );

        List<EmprestimoResponseDTO> ultimos = emprestimoRepository.findTop5ByOrderByDataEmprestimoDesc()
                .stream()
                .map(this::toEmprestimoResponseDTO)
                .toList();

        dto.setUltimosEmprestimos(ultimos);

        return dto;
    }

    private EmprestimoResponseDTO toEmprestimoResponseDTO(Emprestimo emprestimo) {
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
