import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/User';
import { AccountService } from '../shared/services/account.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  loginObj: any = {}
  loggedIn$: Observable<User>;

  constructor(private accountService: AccountService) { }

  ngOnInit(): void {
    // check if user is logged in or not
    this.loggedIn$ = this.accountService.loggedInUser$;
  }

  login() {
    this.accountService.login(this.loginObj).subscribe(res => {
    }, error => {
      console.log(error);
    })
  }

  logout() {
    this.accountService.logout();
  }


}
