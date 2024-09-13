import { Injectable } from '@angular/core';
import { environment } from '../envirenment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiurl = environment.apiurl + '/Auth';

  constructor(private http: HttpClient) {}

  login(credentials: { email: string; password: string }): Observable<any> {
    return this.http.post(this.apiurl + '/login', credentials);
  }

  setUser(user: any) {
    localStorage.setItem('userInfo', JSON.stringify(user));
  }

  getUser(): any {
    return JSON.parse(localStorage.getItem('userInfo')!);
  }

  isAuthenticated(): boolean {
    return !!this.getUser();
  }

  logout() {
    localStorage.removeItem('userInfo');
  }
}
