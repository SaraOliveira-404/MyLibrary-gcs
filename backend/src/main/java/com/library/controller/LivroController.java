package com.library.controller;

import com.library.dto.request.LivroRequestDTO;
//import com.library.dto.response.EmprestimoResponseDTO;
import com.library.dto.response.LivroResponseDTO;
import com.library.model.StatusLivro;
import com.library.service.LivroService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/livros")
public class LivroController {

    private final LivroService livroService;

    public LivroController(LivroService livroService) {
        this.livroService = livroService;
    }

    @GetMapping
    public ResponseEntity<List<LivroResponseDTO>> listar(
            @RequestParam(required = false) Long categoriaId,
            @RequestParam(required = false) StatusLivro status,
            @RequestParam(required = false) String termo
    ) {
        return ResponseEntity.ok(livroService.filtrar(categoriaId, status, termo));
    }

    @GetMapping("/{id}")
    public ResponseEntity<LivroResponseDTO> buscarPorId(@PathVariable Long id) {
        return ResponseEntity.ok(livroService.buscarPorId(id));
    }

    @GetMapping("/isbn/{isbn}")
    public ResponseEntity<LivroResponseDTO> buscarPorIsbn(@PathVariable String isbn) {
        return ResponseEntity.ok(livroService.buscarPorIsbn(isbn));
    }

    @PostMapping
    public ResponseEntity<LivroResponseDTO> cadastrar(@Valid @RequestBody LivroRequestDTO request) {
        LivroResponseDTO livro = livroService.cadastrar(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(livro);
    }

    @PutMapping("/{id}")
    public ResponseEntity<LivroResponseDTO> atualizar(
            @PathVariable Long id,
            @Valid @RequestBody LivroRequestDTO request
    ) {
        return ResponseEntity.ok(livroService.atualizar(id, request));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> excluir(@PathVariable Long id) {
        livroService.excluir(id);
        return ResponseEntity.noContent().build();
    }

    /*@GetMapping("/{id}/historico")
    public ResponseEntity<List<EmprestimoResponseDTO>> historico(@PathVariable Long id) {
        return ResponseEntity.ok(livroService.historicoEmprestimos(id));
    }*/
}
