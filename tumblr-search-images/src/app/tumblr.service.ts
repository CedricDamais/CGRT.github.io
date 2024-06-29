import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TumblrService {
  private apiUrl = 'https://api.tumblr.com/v2';
  private apiKey = 'sYrwlv6LGjrDfXfin5QKCHDl7yLlLvP8uqoYb20IKWYkNurLiS';

  constructor(private http: HttpClient) {}

  getTaggedPosts(tag: string, filters: any = {}): Observable<any> {
    let params = new HttpParams().set('tag', tag).set('api_key', this.apiKey);

    if (filters.before) {
      params = params.set('before', filters.before);
    }
    if (filters.limit) {
      params = params.set('limit', filters.limit);
    }
    if (filters.filter) {
      params = params.set('filter', filters.filter);
    }

    return this.http.get(`${this.apiUrl}/tagged`, { params });
  }
}