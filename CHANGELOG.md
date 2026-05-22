# Changelog

## [1.0.0] - 2026-05-22

### Added
- RF01: CRUD Categorias com validação de exclusão (#1)
- RF02: CRUD Livros com filtros e status (#2)
- RF03: Sistema de empréstimos com emprestar e devolver (#3)
- Pipeline CI com build do backend Maven e frontend Angular
- Status automático dos livros: DISPONIVEL ↔ EMPRESTADO
- Dashboard com informações gerais da biblioteca
- Bug intencional de exclusão de livro emprestado para fluxo de hotfix (#4)

### Technical
- Entidades principais: Categoria, Livro e Emprestimo
- Camada Service com regras de negócio
- Repositories com Spring Data JPA
- Controllers REST para categorias, livros, empréstimos e dashboard
- DTOs separados em request e response
- Branch protection configurado no main

## [0.1.0] - 2026-05-21
### Added
- Configuração inicial do repositório
- Estrutura inicial com backend e frontend
- README inicial
- Baseline inicial do projeto