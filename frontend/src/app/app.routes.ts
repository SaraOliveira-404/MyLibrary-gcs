import { Routes } from '@angular/router';
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';
import { CategoriaListComponent } from './pages/categorias/categoria-list/categoria-list.component';
import { CategoriaFormComponent } from './pages/categorias/categoria-form/categoria-form.component';

export const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      { path: '', redirectTo: 'categorias', pathMatch: 'full' },
      { path: 'dashboard', redirectTo: 'categorias', pathMatch: 'full' },
      { path: 'categorias', component: CategoriaListComponent },
      { path: 'categorias/nova', component: CategoriaFormComponent },
    ],
  },
  { path: '**', redirectTo: 'categorias' },
];