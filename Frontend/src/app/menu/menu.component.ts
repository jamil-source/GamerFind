import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
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
  showNav: boolean = true;

  constructor(private accountService: AccountService, private shared: SharedService, private router: Router, private toastr: ToastrService, private location: Location) { }

  ngOnInit(): void {
    // check if user is logged in or not
    this.loggedIn$ = this.accountService.loggedInUser$;
    this.shared.registerSwitchState.subscribe(state => this.registerSwitch = state);
    this.shared.hideNavState.subscribe(state => {
      this.showNav = state
    })
  }

  login() {
    this.accountService.login(this.loginObj).subscribe(res => {
      this.router.navigateByUrl('/members')
    }, error => {
      this.toastr.error(error.error)
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
