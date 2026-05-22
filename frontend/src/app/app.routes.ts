import { Routes } from '@angular/router';
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { LivroListComponent } from './pages/livros/livro-list/livro-list.component';
import { LivroFormComponent } from './pages/livros/livro-form/livro-form.component';
import { LivroHistoricoComponent } from './pages/livros/livro-historico/livro-historico.component';
import { EmprestimoListComponent } from './pages/emprestimos/emprestimo-list/emprestimo-list.component';
import { EmprestimoFormComponent } from './pages/emprestimos/emprestimo-form/emprestimo-form.component';
import { CategoriaListComponent } from './pages/categorias/categoria-list/categoria-list.component';
import { CategoriaFormComponent } from './pages/categorias/categoria-form/categoria-form.component';

export const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'dashboard' },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'livros', component: LivroListComponent },
      { path: 'livros/novo', component: LivroFormComponent },
      { path: 'livros/editar/:id', component: LivroFormComponent },
      { path: 'livros/:id/historico', component: LivroHistoricoComponent },
      { path: 'emprestimos', component: EmprestimoListComponent },
      { path: 'emprestimos/novo', component: EmprestimoFormComponent },
      { path: 'categorias', component: CategoriaListComponent },
      { path: 'categorias/nova', component: CategoriaFormComponent },
      { path: 'relatorios', redirectTo: 'emprestimos' }
    ]
  },
  { path: '**', redirectTo: 'dashboard' }
];
