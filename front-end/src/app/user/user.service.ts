import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_URL } from '../constants';
import { IUser } from './manage-users/manage-users.component';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  endpoint = `${API_URL}/user`;
  constructor(private httpClient: HttpClient) {}

  getUsersData(): Observable<IUser[]> {
    return this.httpClient.get<IUser[]>(this.endpoint);
  }

  ugradeUserAccessLevel(id: number): Observable<any> {
    return this.httpClient.put<any>(this.endpoint, { id });
  }
}
