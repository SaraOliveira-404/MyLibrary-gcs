import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-stat-card',
  standalone: true,
  templateUrl: './stat-card.component.html',
  styleUrl: './stat-card.component.css'
})
export class StatCardComponent {
  @Input({ required: true }) title = '';
  @Input({ required: true }) value: number | string = 0;
  @Input() subtitle = '';
  @Input() icon = '▰';
  @Input() color: 'blue' | 'green' | 'red' | 'orange' = 'blue';
}
