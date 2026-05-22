import { Routes } from '@angular/router';
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';
import { CategoriaListComponent } from './pages/categorias/categoria-list/categoria-list.component';
import { CategoriaFormComponent } from './pages/categorias/categoria-form/categoria-form.component';
import { LivroListComponent } from './pages/livros/livro-list/livro-list.component';
import { LivroFormComponent } from './pages/livros/livro-form/livro-form.component';


export const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      { path: '', redirectTo: 'categorias', pathMatch: 'full' },
      { path: 'dashboard', redirectTo: 'categorias', pathMatch: 'full' },
      { path: 'categorias', component: CategoriaListComponent },
      { path: 'categorias/nova', component: CategoriaFormComponent },
      { path: 'livros', component: LivroListComponent },
      { path: 'livros/novo', component: LivroFormComponent },
      { path: 'livros/editar/:id', component: LivroFormComponent },
    ],
  },
  { path: '**', redirectTo: 'categorias' },
];