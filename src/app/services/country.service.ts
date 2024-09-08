import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CountryService {
  private apiUrl = 'https://restcountries.com/v3.1';

  constructor(private http: HttpClient) { }

  public getAllCountries(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/all`);
  }

  public filterCountriesByRegion(region: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/region/${region}`);
  }

  public getSingleCountry(country: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/alpha/${country}`)
  }
}
