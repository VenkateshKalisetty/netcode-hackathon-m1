import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_URL, TOKEN_NAME } from '../constants';
import { IUser } from '../user/manage-users/manage-users.component';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  constructor(private httpClient: HttpClient) {}

  isAuthenticated(): boolean {
    const token = this.getToken();
    return token ? true : false;
  }

  removeToken(): void {
    localStorage.removeItem(TOKEN_NAME);
  }

  setLocalStorage(data: any): void {
    localStorage.setItem(TOKEN_NAME, JSON.stringify(data));
  }

  getToken(): string {
    const data = JSON.parse(localStorage.getItem(TOKEN_NAME));
    return data ? data.jwtToken : null;
  }

  getUser(): IUser {
    const data = JSON.parse(localStorage.getItem(TOKEN_NAME));
    return data ? data.user : {};
  }

  signin(authData: any): Observable<any> {
    const endpoint = `${API_URL}/auth`;
    return this.httpClient.post<any>(endpoint, authData);
  }

  signup(data: any): Observable<any> {
    const endpoint = `${API_URL}/user`;
    return this.httpClient.post<any>(endpoint, data);
  }
}
