import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  showNav = true;

  private registerSwitch = new BehaviorSubject<boolean>(false)
  registerSwitchState = this.registerSwitch.asObservable();

  private hideNav = new BehaviorSubject<boolean>(true)
  hideNavState = this.hideNav.asObservable();

  constructor() { }

  changeRegisterSwitchState(state: boolean){
    this.registerSwitch.next(state)
  }

  changeHideNav(state: boolean){
    this.showNav = state
    this.hideNav.next(this.showNav)
  }
}
