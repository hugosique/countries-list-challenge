import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../../shared/components/header/header.component';
import { ActivatedRoute, Router } from '@angular/router';
import { CountryService } from '../../services/country.service';
import { map } from 'rxjs/operators';
import { COUTNRIES_SELECT_LIST } from '../../shared/constants/countries.const';
import { PopulationPipe } from '../../shared/pipes/population.pipe';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-country-details',
  standalone: true,
  imports: [HeaderComponent, PopulationPipe, CommonModule],
  templateUrl: './country-details.component.html',
  styleUrl: './country-details.component.scss'
})
export class CountryDetailsComponent implements OnInit{

  countryCode!: string;
  countryDetails: any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private countryService: CountryService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {
      this.countryCode = params.get('code') || '';
    });

    this.loadCountryDetails();
  }

  public backToHomePage(): void {
    this.router.navigate(['home']);
  }

  public loadCountryDetails() {
    this.countryService.getSingleCountry(this.countryCode).pipe(
      map((countries: any[]) => 
        countries.map(country => {
          const languageKey = Object.keys(country.languages)[0];
          const currencyKey = Object.keys(country.currencies)[0];
  
          return {
            name: country.name.common,
            population: country.population,
            region: country.region,
            capital: country.capital ? country.capital[0] : 'N/A',
            flags: {
              src: country.flags?.png || 'N/A',
              alt: country.flags?.alt
            },
            nativeName: country.name.nativeName[languageKey] || country.name.official,
            languageKey: languageKey,
            subregion: country.subregion,
            topLevelDomain: country.tld[0],
            currencies: country.currencies[currencyKey]?.name || "Não encontrada",
            languages: Object.values(country.languages),
            borders: country.borders
          };
        })
      )
    ).subscribe(res => {
      this.countryDetails = res[0];
      console.log(this.countryDetails)
    });
  }
}
