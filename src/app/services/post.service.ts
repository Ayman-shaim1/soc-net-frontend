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
    const token = this.authService.getUser().token;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.http.post<any>(this.apiurl, data, { headers });
  }

  getPosts(): Observable<any> {
    const token = this.authService.getUser().token;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.http.get(this.apiurl, { headers });
  }

  getPostById(id: any): Observable<any> {
    let url = this.apiurl + '/' + id;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    return this.http.get(url, { headers });
  }

  deletePost(postId: Number): Observable<any> {
    let apiurllike = this.apiurl + `/${postId}`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.http.delete(apiurllike, { headers });
  }

  toggleLikePost(postId: number): Observable<any> {
    let apiurllike = this.apiurl + `/${postId}/toggle/like`;
    const token = this.authService.getUser().token;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      authorization: `Bearer ${token}`,
    });
    return this.http.put(apiurllike, {}, { headers });
  }

  addComment(textcontent: string, postId: number) {
    let apiurllike = this.apiurl + `/comments/${postId}`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.http.post(apiurllike, { textcontent }, { headers });
  }

  removeComment(postId: number, commentId: number) {
    let apiurllike = this.apiurl + `/${postId}/comments/${commentId}`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.http.delete(apiurllike, { headers });
  }
}
