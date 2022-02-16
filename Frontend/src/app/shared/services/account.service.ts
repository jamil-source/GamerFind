import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from 'src/app/models/User';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  baseUrl = environment.apiUrl;

  private loggedInUserSrc = new ReplaySubject<User>(1);
  loggedInUser$ = this.loggedInUserSrc.asObservable();

  constructor(private http: HttpClient) { }

  login(loginObj: any) {
    return this.http.post(`${this.baseUrl}users/login`, loginObj).pipe(
      map((res: User) => {
        const user = res;
        user && (localStorage.setItem('user', JSON.stringify(user)), this.loggedInUserSrc.next(user));
        return user;
      })
    )
  }

  register(registerObj: any) {
    return this.http.post(`${this.baseUrl}users/register`, registerObj).pipe(
      map((user: User) => {
        //Login once registration is done
        user && (localStorage.setItem('user', JSON.stringify(user)), this.loggedInUserSrc.next(user));
        return user;
      })
    )
  }

  setLoggedInUser(user: User) {
    this.loggedInUserSrc.next(user);
  }

  logout() {
    localStorage.removeItem('user');
    this.loggedInUserSrc.next(null)
  }
}
