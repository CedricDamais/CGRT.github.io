import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SearchComponent } from './search/search.component';
import { ImagesComponent } from './images/images.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FormsModule, SearchComponent, ImagesComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'tumblr-search-images';
  searchResults: any[] = [];

  updateSearchResults(results: any[]): void {
    this.searchResults = results;
  }
}