import { NumberSymbol } from '@angular/common';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Member } from 'src/app/models/Member';
import { Paginated } from 'src/app/models/Pagination';
import { UserParams } from 'src/app/models/UserParams';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MembersService {
  baseUrl = environment.apiUrl;
  paginated: Paginated<Member[]> = new Paginated<Member[]>();

  constructor(private http: HttpClient) { }

  getMembers(userParams: UserParams) {
    let params = this.getPaginationHeaders(userParams.pageNumber, userParams.pageSize);

    params = params.append("minAge", userParams.minAge.toString())
    params = params.append("maxAge", userParams.maxAge.toString())
    params = params.append("gameType", userParams.gameType)


    return this.http.get<Member[]>(`${this.baseUrl}users`, { observe: 'response', params })
  }

  getPaginationHeaders(pageNumber: number, pageSize: number) {
    let params = new HttpParams();

    params = params.append('pageNumber', pageNumber.toString())
    params = params.append('pageSize', pageSize.toString())

    return params;

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
