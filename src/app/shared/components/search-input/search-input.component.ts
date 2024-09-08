import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-search-input',
  standalone: true,
  imports: [],
  templateUrl: './search-input.component.html',
  styleUrl: './search-input.component.scss'
})
export class SearchInputComponent {

  @Output() searchCountryEvent = new EventEmitter<string>();

  public onInputSearch(event: Event): void {
    const inputSearchElement = event.target as HTMLInputElement;
    this.searchCountryEvent.emit(inputSearchElement.value);
  }

}
