import { AfterViewChecked, Component, OnInit } from '@angular/core';
import { signal } from '@angular/core';
// Components
import { HeaderComponent } from '../../shared/components/header/header.component';
import { SearchInputComponent } from '../../shared/components/search-input/search-input.component';
import { DropdownComponent } from '../../shared/components/dropdown/dropdown.component';
import { CountryItemComponent } from '../../shared/components/country-item/country-item.component';
import { CountryService } from '../../services/country.service';
import { filter, map } from 'rxjs/operators';
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
export class HomeComponent implements OnInit {
  loadingPage: boolean = true;
  countriesSignal = signal<ICountry[]>([]);
  filteredCountriesSignal = signal<ICountry[]>([]);

  constructor(private countryService: CountryService) {}
  
  ngOnInit(): void {
    this.loadAllCountries();
  }

  public onRegionChange(item: IRegion | null): void {
    this.loadingPage = true;

    if(item) {
      this.countryService.filterCountriesByRegion(item.value).pipe(
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
        this.filteredCountriesSignal.set(res);
        this.loadingPage = false;
      });
    } else {
      this.loadAllCountries();
    }
  }
  
  public onSearchInput(search: string): void {
    const filteredCountries = this.countriesSignal().filter(country => {
      return country.name.toLowerCase().includes(search.toLowerCase());
    });

    this.filteredCountriesSignal.set(filteredCountries);
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
      this.filteredCountriesSignal.set(res);
      this.loadingPage = false;
    });
  }
}
