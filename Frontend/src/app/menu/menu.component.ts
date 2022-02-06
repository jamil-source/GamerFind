import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  loginObj: any = {}
  constructor() { }

  ngOnInit(): void {
  }

  login() {
    console.log(this.loginObj)
  }

}
