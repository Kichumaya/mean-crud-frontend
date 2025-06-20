import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UserService {
  private baseUrl = 'http://localhost:3005/api/users';

  constructor(private http: HttpClient) {}

  getUsers(): Observable<any[]> {
    const token = localStorage.getItem('jwtToken')
    console.log('token ==> ', token)
    return this.http.get<any[]>(this.baseUrl, {
      headers: { authorization: `Bearer ${token}`}
    });
  }

  createUser(user: any) {
    return this.http.post(this.baseUrl, user);
  }

  updateUser(id: string, user: any) {
    return this.http.put(`${this.baseUrl}/${id}`, user);
  }

  deleteUser(id: string) {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}
