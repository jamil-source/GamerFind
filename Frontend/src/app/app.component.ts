import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { User } from './models/User';
import { AccountService } from './shared/services/account.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'GamerFind';
  users: any;

  constructor(private http: HttpClient, private accountService: AccountService) { }

  ngOnInit() {
    const user: User = JSON.parse(localStorage.getItem('user'));
    this.accountService.setLoggedInUser(user);
  }
}
