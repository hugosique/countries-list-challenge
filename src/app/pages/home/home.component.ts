import { AfterViewChecked, Component, OnInit } from '@angular/core';
import { signal } from '@angular/core';
// Components
import { HeaderComponent } from '../../shared/components/header/header.component';
import { SearchInputComponent } from '../../shared/components/search-input/search-input.component';
import { DropdownComponent } from '../../shared/components/dropdown/dropdown.component';
import { CountryItemComponent } from '../../shared/components/country-item/country-item.component';
import { CountryService } from '../../services/country.service';
import { map } from 'rxjs/operators';
import { ICountry } from '../../core/interfaces/country';
import { IRegion } from '../../core/interfaces/regions';
import { CommonModule, NgIf } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    HeaderComponent, 
    SearchInputComponent, 
    DropdownComponent, 
    CountryItemComponent,
    CommonModule
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements AfterViewChecked {
  loadingPage: boolean = true;
  countriesSignal = signal<ICountry[]>([]);

  constructor(private countryService: CountryService) {}
  
  ngAfterViewChecked(): void {
    this.loadAllCountries();
  }

  public onRegionChange(item: IRegion | null): void {
    console.log(item)
  }

  public loadAllCountries(): void {
    this.countryService.getAllCountries().pipe(
      map((countries: any[]) => 
        countries.map(country => ({
          name: country.name.common,
          population: country.population,
          region: country.region,
          capital: country.capital ? country.capital[0] : 'N/A',
          flags: {
            src: country.flags?.png || country.flags.png || 'N/A',
            alt: country.flags?.alt
          }
        }))
      )
    ).subscribe(res => {
      this.countriesSignal.set(res);
      this.loadingPage = false;
    });
  }
}
