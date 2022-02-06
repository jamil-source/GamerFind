import { Component, OnInit } from '@angular/core';
import { AccountService } from '../shared/services/account.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  loginObj: any = {}
  loggedIn: boolean;

  constructor(private accountService: AccountService) { }

  ngOnInit(): void {
  }

  login() {
    this.accountService.login(this.loginObj).subscribe(res => {
      console.log(res);
      this.loggedIn = true;
    }, error =>{
      console.log(error);
    })
  }

  logout(){
    this.loggedIn = false;
  }

}
