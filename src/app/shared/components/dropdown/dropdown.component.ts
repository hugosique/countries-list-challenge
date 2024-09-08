import { CommonModule, NgFor, NgIf } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
// Constants
import { REGIONS_SELECT_LIST } from '../../constants/regions.const';
import { IRegion } from '../../../core/interfaces/regions';

@Component({
  selector: 'app-dropdown',
  standalone: true,
  imports: [CommonModule, NgIf, NgFor],
  templateUrl: './dropdown.component.html',
  styleUrl: './dropdown.component.scss'
})

export class DropdownComponent {
  isDropdownOpen = false;
  selectedItem: any | null = '';
  regionsSelectItems: IRegion[] = REGIONS_SELECT_LIST;

  @Output() selectionChanged = new EventEmitter<any | null>();

  public toggleDropdownOptions(event: Event): void {
    this.isDropdownOpen = !this.isDropdownOpen;
    event.stopPropagation();
  }

  public selectItem(item: any, event: Event): void {
    this.selectedItem = item;
    this.isDropdownOpen = false;
    this.selectionChanged.emit(this.selectedItem);
    event.stopPropagation();
  }

  public clearSelection(event: Event): void {
    this.selectedItem = null;
    this.selectionChanged.emit(this.selectedItem);
    event.stopPropagation();
  }
}
