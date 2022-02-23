import { NumberSymbol } from '@angular/common';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Member } from 'src/app/models/Member';
import { Paginated } from 'src/app/models/Pagination';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MembersService {
  baseUrl = environment.apiUrl;
  paginated: Paginated<Member[]> = new Paginated<Member[]>();

  constructor(private http: HttpClient) { }

  getMembers(page?: number, itemsPerPage?: number) {
    let params = new HttpParams();
  
    if (page !== null && itemsPerPage !== null) {
      params = params.append('pageNumber', page.toString())
      params = params.append('pageSize', itemsPerPage.toString())
    }

    return this.http.get<Member[]>(`${this.baseUrl}users`, { observe: 'response', params })
  }

  getMember(userName: string) {
    return this.http.get<Member>(`${this.baseUrl}users/${userName}`)
  }

  updateMemberInfo(member: Member) {
    return this.http.put(`${this.baseUrl}users`, member)
  }

  updateMainPhoto(photoId: number) {
    return this.http.put(`${this.baseUrl}users/main-photo/${photoId}`, {});
  }

  deletePhoto(photoId: number) {
    return this.http.delete(`${this.baseUrl}users/delete-photo/${photoId}`);
  }
}
