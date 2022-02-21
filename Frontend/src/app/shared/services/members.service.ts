import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Member } from 'src/app/models/Member';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MembersService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getMembers() {
    return this.http.get<Member[]>(`${this.baseUrl}users`)
  }

  getMember(userName: string) {
    return this.http.get<Member>(`${this.baseUrl}users/${userName}`)
  }

  updateMemberInfo(member: Member){
     return this.http.put(`${this.baseUrl}users`, member)
  }

  updateMainPhoto(photoId: number){
    return this.http.put(`${this.baseUrl}users/main-photo/${photoId}`, {});
  }

  deletePhoto(photoId: number){
    return this.http.delete(`${this.baseUrl}users/delete-photo/${photoId}`);
  }
}
