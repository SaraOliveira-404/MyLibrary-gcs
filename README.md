# MyLibrary-gcs
Sistema completo de gerenciamento de biblioteca pessoal

## Tecnologias utilizadas
BACKEND
- Java
- Spring Boot
- Spring Web
- Spring Data JPA
- H2 Database
- Maven Wrapper

FRONTEND
- Angular
- TypeScript
- HTML
- CSS
- npm

## Requisitos
Antes de rodar o projeto, é necessário ter instalado:

- Java JDK 17 ou superior
- Node.js LTS
- npm
- Git

Não é necessário instalar o Maven manualmente, pois o backend possui o arquivo mvnw.cmd, que executa o Maven Wrapper.

## Como rodar projeto
O projeto deve ser iniciado em dois terminais diferentes:

um terminal para o backend
outro terminal para o frontend

Para rodar corretamente, o backend deve estar ativo antes de utilizar as funcionalidades do frontend que acessam a API.

### Backend
no powershell
cd backend
.\mvnw.cmd spring-boot:run

O backend será iniciado em:
http://localhost:8080


### Frontend
no powershell
cd frontend
npm.cmd install
npm.cmd start

O frontend será iniciado em:
http://localhost:4200

Depois acesse no navegador:
http://localhost:4200

## Banco de dados
O backend usa H2 em memória. Console:
http://localhost:8080/h2-console


Dados:
JDBC URL: jdbc:h2:mem:mylibrary
User: sa
Password: deixe vazio

Configuração usada no backend:
spring.datasource.url=jdbc:h2:mem:mylibrary
spring.datasource.driverClassName=org.h2.Driver
spring.datasource.username=sa
spring.datasource.password=

## APIs principais
- Categorias
GET     /api/categorias
POST    /api/categorias

- Livros
GET     /api/livros
POST    /api/livros
PUT     /api/livros/{id}

- Empréstimos
GET     /api/emprestimos
POST    /api/emprestimos

- Dashboard
GET     /api/dashboard

## Funcionalidades implementadas
- Cadastro de categorias
- Listagem de categorias
- Cadastro de livros
- Listagem de livros
- Edição de livros
- Controle de status dos livros
- Registro de empréstimos
- Listagem de empréstimos
- Dashboard com informações gerais da biblioteca
- Integração entre frontend Angular e backend Spring Boot
- Banco de dados H2 em memória

## Estrutura do projeto
MyLibrary-gcs/
├── backend/
│   ├── .mvn/weapper
│   │   └── maven-wrapper.properties
│   ├── src/
│   │   └── main/
│   │       ├── java/
│   │       │   └── com/
│   │       │       └── library/
│   │       │           ├── config/
│   │       │           │   └── CorsConfig.java
│   │       │           ├── controller/
│   │       │           │   ├── CategoriaController.java
│   │       │           │   ├── DashboardController.java
│   │       │           │   ├── EmprestimoController.java
│   │       │           │   └── LivroController.java
│   │       │           ├── dto/
│   │       │           │   ├── request/
│   │       │           │   │   ├── CategoriaRequestDTO.java
│   │       │           │   │   ├── EmprestimoRequestDTO.java
│   │       │           │   │   └── LivroRequestDTO.java
│   │       │           │   └── response/
│   │       │           │       ├── CategoriaResponseDTO.java
│   │       │           │       ├── DashboardResponseDTO.java
│   │       │           │       ├── EmprestimoResponseDTO.java
│   │       │           │       └── LivroResponseDTO.java
│   │       │           ├── exception/
│   │       │           │   ├── BusinessException.java
│   │       │           │   ├── GlobalExceptionHandler.java
│   │       │           │   └── NotFoundException.java
│   │       │           ├── model/
│   │       │           │   ├── Categoria.java
│   │       │           │   ├── Emprestimo.java
│   │       │           │   ├── Livro.java
│   │       │           │   └── StatusLivro.java
│   │       │           ├── repository/
│   │       │           │   ├── CategoriaRepository.java
│   │       │           │   ├── EmprestimoRepository.java
│   │       │           │   └── LivroRepository.java
│   │       │           ├── service/
│   │       │           │   ├── CategoriaService.java
│   │       │           │   ├── DashboardService.java
│   │       │           │   ├── EmprestimoService.java
│   │       │           │   └── LivroService.java
│   │       │           └── LibraryApplication.java
│   │       └── resources/
│   │           └── application.properties
│   ├── mvnw
│   ├── mvnw.cmd
│   └── pom.xml
│
├── frontend/
│   ├── src/
│   │   ├── app/
│   │   │   ├── core/
│   │   │   │   ├── models/
│   │   │   │   │   ├── api-error.model.ts
│   │   │   │   │   ├── categoria.model.ts
│   │   │   │   │   ├── dashboard.model.ts
│   │   │   │   │   ├── emprestimo.model.ts
│   │   │   │   │   ├── livro.model.ts
│   │   │   │   │   └── status-livro.model.ts
│   │   │   │   └── services/
│   │   │   │       ├── api.config.ts
│   │   │   │       ├── categoria.service.ts
│   │   │   │       ├── dashboard.service.ts
│   │   │   │       ├── emprestimo.service.ts
│   │   │   │       ├── error-message.util.ts
│   │   │   │       └── livro.service.ts
│   │   │   ├── layout/
│   │   │   │   ├── main-layout/
│   │   │   │   │   ├── main-layout.component.css
│   │   │   │   │   ├── main-layout.component.html
│   │   │   │   │   └── main-layout.component.ts
│   │   │   │   └── sidebar/
│   │   │   │       ├── sidebar.component.css
│   │   │   │       ├── sidebar.component.html
│   │   │   │       └── sidebar.component.ts
│   │   │   ├── pages/
|   |   |   |   ├── categotias/
│   │   │   │   │   ├── categoria-form/
│   │   │   │   │   │   ├── categoria-form.component.css
│   │   │   │   │   │   ├── categoria-form.component.html
│   │   │   │   │   │   └── categoria-form.component.ts
│   │   │   │   │   └── categoria-list/
│   │   │   │   │       ├── categoria-list.component.css
│   │   │   │   │       ├── categoria-list.component.html
│   │   │   │   │       └── categoria-list.component.ts
│   │   │   │   ├── dashboard/
│   │   │   │   │   ├── dashboard.component.css
│   │   │   │   │   ├── dashboard.component.html
│   │   │   │   │   └── dashboard.component.ts
│   │   │   │   ├── livros/
│   │   │   │   │   ├── livro-form/
│   │   │   │   │   │   ├── livro-form.component.css
│   │   │   │   │   │   ├── livro-form.component.html
│   │   │   │   │   │   └── livro-form.component.ts
│   │   │   │   │   ├── livro-historico/
│   │   │   │   │   │   ├── livro-historico.component.css
│   │   │   │   │   │   ├── livro-historico.component.html
│   │   │   │   │   │   └── livro-historico.component.ts
│   │   │   │   │   └── livro-list/
│   │   │   │   │       ├── livro-list.component.css
│   │   │   │   │       ├── livro-list.component.html
│   │   │   │   │       └── livro-list.component.ts
│   │   │   │   └── emprestimos/
│   │   │   │       ├── emprestimo-form/
│   │   │   │       │   ├── emprestimo-form.component.css
│   │   │   │       │   ├── emprestimo-form.component.html
│   │   │   │       │   └── emprestimo-form.component.ts
│   │   │   │       └── emprestimo-list/
│   │   │   │           ├── emprestimo-list.component.css
│   │   │   │           ├── emprestimo-list.component.html
│   │   │   │           └── emprestimo-list.component.ts
│   │   │   ├── shared/
│   │   │   ├── app.component.css
│   │   │   ├── app.component.html
│   │   │   ├── app.component.ts
│   │   │   ├── app.config.ts
│   │   │   └── app.routes.ts
│   │   ├── index.html
│   │   ├── main.ts
│   │   └── styles.css
│   ├── angular.json
│   ├── package.json
│   ├── package-lock.json
│   ├── tsconfig.json
│   ├── tsconfig.app.json
│   └── tsconfig.spec.json
│
├── CHANGELOG.md
└── README.md