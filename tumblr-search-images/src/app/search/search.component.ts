import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TumblrService } from '../tumblr.service';
import { ImagesComponent } from '../images/images.component';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [CommonModule, FormsModule, ImagesComponent],
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {
  searchText: string = '';
  specificDate: string = ''; // Date in YYYY-MM-DD format
  limit: number = 20;
  filter: string = 'html';

  searchResultsArray: any[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 10;
  totalPages: number = 0;

  @Output() searchResults = new EventEmitter<any[]>();

  constructor(private tumblrService: TumblrService) {}

  onSearchChange(): void {
    let beforeTimestamp = 0;
    if (this.specificDate) {
      const date = new Date(this.specificDate);
      beforeTimestamp = Math.floor(date.setUTCHours(23, 59, 59, 999) / 1000);
    }

    const filters: any = {
      limit: this.limit,
      filter: this.filter
    };

    if (beforeTimestamp) {
      filters.before = beforeTimestamp;
    }

    if (this.searchText) {
      this.tumblrService.getTaggedPosts(this.searchText, filters).subscribe(response => {
        this.searchResultsArray = response.response;
        if (this.specificDate) {
          const startOfDayTimestamp = Math.floor(new Date(this.specificDate).setUTCHours(0, 0, 0, 0) / 1000);
          this.searchResultsArray = this.searchResultsArray.filter(post => post.timestamp >= startOfDayTimestamp && post.timestamp <= beforeTimestamp);
        }
        this.totalPages = Math.ceil(this.searchResultsArray.length / this.itemsPerPage);
        this.emitPageResults();
      });
    } else {
      this.searchResultsArray = [];
      this.totalPages = 0;
      this.emitPageResults();
    }
  }

  emitPageResults() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.searchResults.emit(this.searchResultsArray.slice(startIndex, endIndex));
  }

  onPageChange(page: number) {
    this.currentPage = page;
    this.emitPageResults();
  }
}
