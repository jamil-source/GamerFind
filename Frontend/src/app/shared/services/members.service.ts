import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Member } from 'src/app/models/Member';
import { environment } from 'src/environments/environment';

// We need to send token with the requests
const httpOpt = {
  headers: new HttpHeaders({
    Authorization: `Bearer ${JSON.parse(localStorage.getItem('user'))?.token}`
  })
}

@Injectable({
  providedIn: 'root'
})
export class MembersService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getMembers() {
    return this.http.get<Member[]>(`${this.baseUrl}users`, httpOpt)
  }

  getMember(userName: string) {
    return this.http.get<Member[]>(`${this.baseUrl}users/${userName}`, httpOpt)

  }
}
