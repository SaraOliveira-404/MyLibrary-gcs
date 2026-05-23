package com.library.repository;

import com.library.model.Livro;
import com.library.model.StatusLivro;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface LivroRepository extends JpaRepository<Livro, Long> {

    Optional<Livro> findByIsbn(String isbn);

    @Query("""
        SELECT l
        FROM Livro l
        WHERE LOWER(l.titulo) LIKE LOWER(CONCAT('%', :termo, '%'))
           OR LOWER(l.autor) LIKE LOWER(CONCAT('%', :termo, '%'))
           OR LOWER(l.isbn) LIKE LOWER(CONCAT('%', :termo, '%'))
    """)
    List<Livro> searchByTituloOrAutor(@Param("termo") String termo);

    @Query("""
        SELECT l
        FROM Livro l
        WHERE
            (:categoriaId IS NULL OR l.categoria.id = :categoriaId)
        AND
            (:status IS NULL OR l.status = :status)
        AND
            (
                :termo IS NULL
                OR LOWER(l.titulo) LIKE LOWER(CONCAT('%', :termo, '%'))
                OR LOWER(l.autor) LIKE LOWER(CONCAT('%', :termo, '%'))
                OR LOWER(l.isbn) LIKE LOWER(CONCAT('%', :termo, '%'))
            )
    """)
    List<Livro> filtrarLivros(
            @Param("categoriaId") Long categoriaId,
            @Param("status") StatusLivro status,
            @Param("termo") String termo
    );

    long countByStatus(StatusLivro status);
}