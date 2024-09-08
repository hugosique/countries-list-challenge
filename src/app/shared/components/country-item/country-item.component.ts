import { Component } from '@angular/core';
import { COUTNRIES_SELECT_LIST } from '../../constants/countries.const';
import { PopulationPipe } from '../../pipes/population.pipe';

@Component({
  selector: 'app-country-item',
  standalone: true,
  imports: [PopulationPipe],
  templateUrl: './country-item.component.html',
  styleUrl: './country-item.component.scss'
})
export class CountryItemComponent {

  country = COUTNRIES_SELECT_LIST[0];

}
