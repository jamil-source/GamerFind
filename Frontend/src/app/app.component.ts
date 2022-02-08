import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router, NavigationStart, Event as NavigationEvent } from '@angular/router';
import { User } from './models/User';
import { AccountService } from './shared/services/account.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'GamerFind';
  users: any;
  currentUrlPath: string;
  backgroundChange: boolean;
  event$: any;

  constructor(private http: HttpClient, private accountService: AccountService, private router: Router) { }

  ngOnInit() {
    const user: User = JSON.parse(localStorage.getItem('user'));
    this.accountService.setLoggedInUser(user);
    console.log(this.router.url)

    this.router.url === "/" ? this.backgroundChange = true : this.backgroundChange = false;
    this.event$ = this.router.events.subscribe(
      (event: NavigationEvent) => {
        if (event instanceof NavigationStart) {
          console.log(event.url);
          event.url === "/" ? this.backgroundChange = true : this.backgroundChange = false;
        }
      });

  }
}
