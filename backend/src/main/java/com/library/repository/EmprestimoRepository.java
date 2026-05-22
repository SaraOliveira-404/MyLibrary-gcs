package com.library.repository;

import com.library.model.Emprestimo;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;

public interface EmprestimoRepository extends JpaRepository<Emprestimo, Long> {

    List<Emprestimo> findByLivroId(Long livroId);

    List<Emprestimo> findByDataDevolucaoEfetivaIsNull();

    List<Emprestimo> findByDataDevolucaoPrevistaBeforeAndDataDevolucaoEfetivaIsNull(LocalDate hoje);

    long countByDataDevolucaoEfetivaIsNull();

    long countByDataDevolucaoPrevistaBeforeAndDataDevolucaoEfetivaIsNull(LocalDate hoje);

    List<Emprestimo> findTop5ByOrderByDataEmprestimoDesc();
}
