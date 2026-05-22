package com.library.dto.response;

import java.util.List;

public class DashboardResponseDTO {

    private long totalLivros;
    private long totalDisponiveis;
    private long totalEmprestados;
    private long totalEmprestimosAtivos;
    private long totalAtrasados;
    private List<EmprestimoResponseDTO> ultimosEmprestimos;

    public long getTotalLivros() {
        return totalLivros;
    }

    public void setTotalLivros(long totalLivros) {
        this.totalLivros = totalLivros;
    }

    public long getTotalDisponiveis() {
        return totalDisponiveis;
    }

    public void setTotalDisponiveis(long totalDisponiveis) {
        this.totalDisponiveis = totalDisponiveis;
    }

    public long getTotalEmprestados() {
        return totalEmprestados;
    }

    public void setTotalEmprestados(long totalEmprestados) {
        this.totalEmprestados = totalEmprestados;
    }

    public long getTotalEmprestimosAtivos() {
        return totalEmprestimosAtivos;
    }

    public void setTotalEmprestimosAtivos(long totalEmprestimosAtivos) {
        this.totalEmprestimosAtivos = totalEmprestimosAtivos;
    }

    public long getTotalAtrasados() {
        return totalAtrasados;
    }

    public void setTotalAtrasados(long totalAtrasados) {
        this.totalAtrasados = totalAtrasados;
    }

    public List<EmprestimoResponseDTO> getUltimosEmprestimos() {
        return ultimosEmprestimos;
    }

    public void setUltimosEmprestimos(List<EmprestimoResponseDTO> ultimosEmprestimos) {
        this.ultimosEmprestimos = ultimosEmprestimos;
    }
}
