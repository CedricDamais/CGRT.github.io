import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TumblrService } from '../tumblr.service';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {
  searchText: string = '';
  @Output() searchResults = new EventEmitter<any[]>();

  constructor(private tumblrService: TumblrService) {}

  onSearchChange(): void {
    if (this.searchText) {
      this.tumblrService.searchTagged(this.searchText).subscribe(response => {
        this.searchResults.emit(response.response);
      });
    } else {
      this.searchResults.emit([]);
    }
  }
}