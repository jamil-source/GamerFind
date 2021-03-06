import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from 'src/app/models/User';
import { environment } from 'src/environments/environment';
import { PresenceService } from './presence.service';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  baseUrl = environment.apiUrl;

  private loggedInUserSrc = new ReplaySubject<User>(1);
  loggedInUser$ = this.loggedInUserSrc.asObservable();

  constructor(private http: HttpClient, private presence: PresenceService) { }

  login(loginObj: any) {
    return this.http.post(`${this.baseUrl}users/login`, loginObj).pipe(
      map((res: User) => {
        const user = res;
        if (user) {
          this.setLoggedInUser(user)
          this.presence.createHubConnection(user)
        }
        return user;
      })
    )
  }

  register(registerObj: any) {
    return this.http.post(`${this.baseUrl}users/register`, registerObj).pipe(
      map((user: User) => {
        //Login once registration is done
        if (user) {
          this.setLoggedInUser(user)
          this.presence.createHubConnection(user)
        }
        return user;
      })
    )
  }

  setLoggedInUser(user: User) {
    user.roles = [];
    const roles = this.getToken(user.token).role;
    Array.isArray(roles) ? user.roles = roles : user.roles.push(roles);
    localStorage.setItem('user', JSON.stringify(user))
    this.loggedInUserSrc.next(user);
  }

  logOut() {
    localStorage.removeItem('user');
    this.loggedInUserSrc.next(null)
    this.presence.stopHubConnection();
  }

  getToken(token) {
    // Decode token info
    return JSON.parse(atob(token.split('.')[1]));
  }
}
