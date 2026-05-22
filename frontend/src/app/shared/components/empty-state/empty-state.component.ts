import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-empty-state',
  standalone: true,
  template: `
    <div class="empty">
      <div>▱</div>
      <strong>{{ title }}</strong>
      <p>{{ message }}</p>
    </div>
  `,
  styles: [`
    .empty{padding:36px;text-align:center;color:var(--muted)}
    .empty div{font-size:36px;margin-bottom:10px;color:var(--primary-2)}
    .empty strong{display:block;color:var(--text);font-size:18px;margin-bottom:6px}
    .empty p{margin:0}
  `]
})
export class EmptyStateComponent {
  @Input() title = 'Nenhum registro encontrado';
  @Input() message = 'Cadastre um novo item para começar.';
}
