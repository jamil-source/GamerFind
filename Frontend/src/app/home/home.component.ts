import { Component, OnInit } from '@angular/core';
import { SharedService } from '../shared/services/shared.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {
  registerSwitch: boolean;

  constructor(private shared: SharedService) { }

  ngOnInit(): void {
    this.shared.registerSwitchState.subscribe(state => this.registerSwitch = state)
  }


}
