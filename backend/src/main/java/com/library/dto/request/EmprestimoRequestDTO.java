package com.library.dto.request;

import jakarta.validation.constraints.FutureOrPresent;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.time.LocalDate;

public class EmprestimoRequestDTO {

    @NotNull(message = "Livro é obrigatório")
    private Long livroId;

    @NotBlank(message = "Nome da pessoa é obrigatório")
    private String nomePessoa;

    @NotBlank(message = "Telefone é obrigatório")
    private String telefone;

    @NotNull(message = "Data de devolução prevista é obrigatória")
    @FutureOrPresent(message = "A data de devolução prevista não pode estar no passado")
    private LocalDate dataDevolucaoPrevista;

    public Long getLivroId() {
        return livroId;
    }

    public void setLivroId(Long livroId) {
        this.livroId = livroId;
    }

    public String getNomePessoa() {
        return nomePessoa;
    }

    public void setNomePessoa(String nomePessoa) {
        this.nomePessoa = nomePessoa;
    }

    public String getTelefone() {
        return telefone;
    }

    public void setTelefone(String telefone) {
        this.telefone = telefone;
    }

    public LocalDate getDataDevolucaoPrevista() {
        return dataDevolucaoPrevista;
    }

    public void setDataDevolucaoPrevista(LocalDate dataDevolucaoPrevista) {
        this.dataDevolucaoPrevista = dataDevolucaoPrevista;
    }
}
