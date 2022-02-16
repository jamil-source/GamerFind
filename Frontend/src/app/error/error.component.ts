import { Component, OnInit } from '@angular/core';
import { faCircleExclamation, faGamepad } from '@fortawesome/free-solid-svg-icons';
import { SharedService } from '../shared/services/shared.service';
@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss']
})
export class ErrorComponent implements OnInit {

  constructor(private shared: SharedService) { }
  faCircleExclamation = faCircleExclamation
  faGamePad = faGamepad
  showNav: boolean = true;


  ngOnInit(): void {
    this.showNav = false;
    this.shared.changeHideNav(this.showNav);
  }

}
