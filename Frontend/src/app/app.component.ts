import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router, NavigationStart, Event as NavigationEvent } from '@angular/router';
import { User } from './models/User';
import { AccountService } from './shared/services/account.service';
import { PresenceService } from './shared/services/presence.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'GamerFind';
  users: any;
  backgroundChange: boolean;
  event$: any;

  constructor(private http: HttpClient, private accountService: AccountService, private router: Router, private presence: PresenceService) { }

  ngOnInit() {
    const user: User = JSON.parse(localStorage.getItem('user'));
    if(user) {
      this.accountService.setLoggedInUser(user);
      this.presence.createHubConnection(user);
    }

    this.router.url === "/" ? this.backgroundChange = true : this.backgroundChange = false;
    this.event$ = this.router.events.subscribe(
      (event: NavigationEvent) => {
        if (event instanceof NavigationStart) {
          event.url === "/" ? this.backgroundChange = true : this.backgroundChange = false;
        }
      });

  }
}
