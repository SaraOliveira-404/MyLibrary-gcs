import { Pipe, PipeTransform } from '@angular/core';
import { formatDate } from '../utils/date.util';

@Pipe({
  name: 'brDate',
  standalone: true
})
export class BrDatePipe implements PipeTransform {
  transform(value: string | null | undefined): string {
    return formatDate(value);
  }
}
