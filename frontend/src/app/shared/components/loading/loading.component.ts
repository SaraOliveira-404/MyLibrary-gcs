import { Component } from '@angular/core';

@Component({
  selector: 'app-loading',
  standalone: true,
  template: '<div class="loading">Carregando...</div>',
  styles: ['.loading{padding:28px;text-align:center;color:var(--muted)}']
})
export class LoadingComponent {}
