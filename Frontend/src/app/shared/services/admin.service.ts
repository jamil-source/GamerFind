import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from 'src/app/models/User';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getUsersAsAdmin() {
    return this.http.get<Partial<User[]>>(`${this.baseUrl}admin/users-with-roles`);
  }

  updateUserRoles(userName: string, roles: string[]) {
    return this.http.post(`${this.baseUrl}admin/edit-roles/${userName}?roles=${roles}`, {});
  }
}
