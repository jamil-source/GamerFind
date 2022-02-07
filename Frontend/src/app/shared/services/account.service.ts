import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from 'src/app/models/User';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  baseUrl = "https://localhost:5001/api/";

  private loggedInUserSrc = new ReplaySubject<User>(1);
  loggedInUser$ = this.loggedInUserSrc.asObservable();

  constructor(private http: HttpClient) { }

  login(loginObj: any) {
    return this.http.post(`${this.baseUrl}users/login`, loginObj).pipe(
      map((res: User) => {
        const user = res;
        user && localStorage.setItem('user', JSON.stringify(user));
        this.loggedInUserSrc.next(user);
      })
    )
  }

  setLoggedInUser(user: User){
    this.loggedInUserSrc.next(user);
  }

  logout() {
    localStorage.removeItem('user');
    this.loggedInUserSrc.next(null)
  }
}
