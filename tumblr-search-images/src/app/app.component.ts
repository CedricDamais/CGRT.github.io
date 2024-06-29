import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SearchComponent } from './search/search.component';
import { ImagesComponent } from './images/images.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule, SearchComponent, ImagesComponent]
})
export class AppComponent {
  searchResults: any[] = [];

  updateSearchResults(results: any[]): void {
    this.searchResults = results;
  }
}