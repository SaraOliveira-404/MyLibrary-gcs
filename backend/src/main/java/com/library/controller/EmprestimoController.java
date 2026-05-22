package com.library.controller;

import com.library.dto.request.EmprestimoRequestDTO;
import com.library.dto.response.EmprestimoResponseDTO;
import com.library.service.EmprestimoService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/emprestimos")
public class EmprestimoController {

    private final EmprestimoService emprestimoService;

    public EmprestimoController(EmprestimoService emprestimoService) {
        this.emprestimoService = emprestimoService;
    }

    @GetMapping
    public ResponseEntity<List<EmprestimoResponseDTO>> listarTodos() {
        return ResponseEntity.ok(emprestimoService.listarTodos());
    }

    @GetMapping("/ativos")
    public ResponseEntity<List<EmprestimoResponseDTO>> listarAtivos() {
        return ResponseEntity.ok(emprestimoService.listarAtivos());
    }

    @GetMapping("/atrasados")
    public ResponseEntity<List<EmprestimoResponseDTO>> listarAtrasados() {
        return ResponseEntity.ok(emprestimoService.listarAtrasados());
    }

    @PostMapping("/emprestar")
    public ResponseEntity<EmprestimoResponseDTO> emprestar(@Valid @RequestBody EmprestimoRequestDTO request) {
        EmprestimoResponseDTO emprestimo = emprestimoService.emprestar(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(emprestimo);
    }

    @PostMapping("/{id}/devolver")
    public ResponseEntity<EmprestimoResponseDTO> devolver(@PathVariable Long id) {
        return ResponseEntity.ok(emprestimoService.devolver(id));
    }
}
