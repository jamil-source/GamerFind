import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  private registerSwitch = new BehaviorSubject<boolean>(false)
  registerSwitchState = this.registerSwitch.asObservable();

  constructor() { }

  changeRegisterSwitchState(state: boolean){
    this.registerSwitch.next(state)
  }
}
