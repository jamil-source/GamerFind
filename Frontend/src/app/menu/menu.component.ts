import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { HomeComponent } from '../home/home.component';
import { User } from '../models/User';
import { AccountService } from '../shared/services/account.service';
import { SharedService } from '../shared/services/shared.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  loginObj: any = {}
  loggedIn$: Observable<User>;
  registerSwitch:boolean;

  constructor(private accountService: AccountService, private shared: SharedService, private router: Router) { }

  ngOnInit(): void {
    // check if user is logged in or not
    this.loggedIn$ = this.accountService.loggedInUser$;
    this.shared.registerSwitchState.subscribe(state => this.registerSwitch = state);
  }

  login() {
    this.accountService.login(this.loginObj).subscribe(res => {
      this.router.navigateByUrl('/members')
    }, error => {
      console.log(error);
    })
  }

  logout() {
    this.accountService.logout();
    this.router.navigateByUrl('/')
  }

  registerToggle(){
    this.registerSwitch = !this.registerSwitch;
    this.shared.changeRegisterSwitchState(this.registerSwitch)
  }



}
