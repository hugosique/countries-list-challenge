import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {
  currentTheme = 'Light';
  isDarkMode: boolean = false;

  ngOnInit(): void {
    if(typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
      const savedTheme = localStorage.getItem('theme');
      
      if(savedTheme) {
        if(this.currentTheme !== savedTheme) {
          this.toggleTheme();
        };
      }
    }
  }

  public toggleTheme(): void {
    const iconElement = document.querySelector('.theme-button__icon');

    if(this.currentTheme === 'Light') {
      this.currentTheme = 'Dark';
      document.body.classList.add('dark-mode');
      this.isDarkMode = true;
      if (iconElement) {
        iconElement.classList.remove('icon-light');
        iconElement.classList.add('icon-dark');
      }
    } else if(this.currentTheme === 'Dark') {
      this.currentTheme = 'Light';
      document.body.classList.remove('dark-mode');
      this.isDarkMode = false;
      if (iconElement) {
        iconElement.classList.remove('icon-dark');
        iconElement.classList.add('icon-light');
      }
    };

    localStorage.setItem('theme', this.currentTheme);
  }
}
