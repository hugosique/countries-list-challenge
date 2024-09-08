import { Component } from '@angular/core';
import { COUTNRIES_SELECT_LIST } from '../../constants/countries.const';

@Component({
  selector: 'app-country-item',
  standalone: true,
  imports: [],
  templateUrl: './country-item.component.html',
  styleUrl: './country-item.component.scss'
})
export class CountryItemComponent {

  country = COUTNRIES_SELECT_LIST[0];

}
