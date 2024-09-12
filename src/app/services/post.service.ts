import { Injectable } from '@angular/core';
import { environment } from '../envirenment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Post } from '../models/post';
import { AuthService } from './auth.service';
@Injectable({
  providedIn: 'root',
})
export class PostService {
  private apiurl = environment.apiurl + '/Post';

  constructor(private http: HttpClient, private authService: AuthService) {}

  // Method to send POST request
  createPost(data: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.authService.getToken()}`,
    });
    return this.http.post<any>(this.apiurl, data, { headers });
  }

  getPosts(): Observable<any> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      authorization: `Bearer ${token}`,
    });
    return this.http.get(this.apiurl, { headers });
  }
}
