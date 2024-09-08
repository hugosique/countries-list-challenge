import { Component, OnInit } from '@angular/core';
// Components
import { HeaderComponent } from '../../shared/components/header/header.component';
import { SearchInputComponent } from '../../shared/components/search-input/search-input.component';
import { DropdownComponent } from '../../shared/components/dropdown/dropdown.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeaderComponent, SearchInputComponent, DropdownComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  ngOnInit(): void {}

  public onChangeSelection(item: any | null): void {
    console.log(item)
  }
}
