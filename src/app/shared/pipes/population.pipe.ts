import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'population',
  standalone: true
})
export class PopulationPipe implements PipeTransform {

  transform(value: number): string {
    if(value === null || value === undefined) return '';

    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  }

}
