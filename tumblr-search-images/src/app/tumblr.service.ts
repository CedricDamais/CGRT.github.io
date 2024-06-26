import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TumblrService {
  private apiUrl = 'https://api.tumblr.com/v2/tagged';
  private apiKey = 'sYrwlv6LGjrDfXfin5QKCHDl7yLlLvP8uqoYb20IKWYkNurLiS';

  constructor(private http: HttpClient) { }

  searchTagged(tag: string): Observable<any>
  {
    let params = new HttpParams()
      .set('tag', tag)
      .set('api_key', this.apiKey);
    return this.http.get(this.apiUrl, { params });
  }
}