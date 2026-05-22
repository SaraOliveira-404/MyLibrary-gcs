package com.library.controller;

import com.library.dto.response.DashboardResponseDTO;
import com.library.service.DashboardService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/dashboard")
public class DashboardController {

    private final DashboardService dashboardService;

    public DashboardController(DashboardService dashboardService) {
        this.dashboardService = dashboardService;
    }

    @GetMapping
    public ResponseEntity<DashboardResponseDTO> buscarDados() {
        return ResponseEntity.ok(dashboardService.buscarDados());
    }
}
