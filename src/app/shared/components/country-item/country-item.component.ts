import { Component, Input, OnInit } from '@angular/core';
import { COUTNRIES_SELECT_LIST } from '../../constants/countries.const';
import { PopulationPipe } from '../../pipes/population.pipe';
import { ICountry } from '../../../core/interfaces/country';
import { Router } from '@angular/router';

@Component({
  selector: 'app-country-item',
  standalone: true,
  imports: [PopulationPipe],
  templateUrl: './country-item.component.html',
  styleUrl: './country-item.component.scss'
})
export class CountryItemComponent {

  @Input() countryData!: ICountry;

  constructor(private router: Router) {}

  public navigateToCountryDetails(): void {
    this.router.navigate(['/country', this.countryData.name.toLowerCase()]);
  }

}
