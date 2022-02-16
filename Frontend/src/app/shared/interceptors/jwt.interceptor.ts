import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AccountService } from '../services/account.service';
import { User } from 'src/app/models/User';
import { take } from 'rxjs/operators';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  constructor(private accountService: AccountService) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    let loggedInUser: User;
    this.accountService.loggedInUser$.pipe(take(1)).subscribe(user => loggedInUser = user)
    if (loggedInUser) {
      request= request.clone({
        setHeaders: {
          Authorization: `Bearer ${loggedInUser.token}`
        }
      })
    }
    return next.handle(request);
  }
}
