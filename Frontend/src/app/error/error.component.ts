import { Component, OnDestroy, OnInit } from '@angular/core';
import { faCircleExclamation, faGamepad } from '@fortawesome/free-solid-svg-icons';
import { SharedService } from '../shared/services/shared.service';
@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss']
})
export class ErrorComponent implements OnInit, OnDestroy {
  faCircleExclamation = faCircleExclamation
  faGamePad = faGamepad
  showNav: boolean = true;

  constructor(private shared: SharedService) { }

  ngOnInit(): void {
    this.showNav = false;
    this.shared.changeHideNav(this.showNav);
  }

  ngOnDestroy(): void {
    this.showNav = true;
    this.shared.changeHideNav(this.showNav);
  }

}
