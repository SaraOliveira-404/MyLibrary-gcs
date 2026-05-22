import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

interface MenuItem {
  label: string;
  icon: string;
  route: string;
}

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  readonly items: MenuItem[] = [
    { label: 'Dashboard', icon: '⌂', route: '/dashboard' },
    { label: 'Livros', icon: '▯', route: '/livros' },
    { label: 'Empréstimos', icon: '☷', route: '/emprestimos' },
    { label: 'Categorias', icon: '▱', route: '/categorias' },
    { label: 'Relatórios', icon: '▤', route: '/relatorios' }
  ];
}