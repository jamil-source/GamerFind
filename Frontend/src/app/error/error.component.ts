import { Component, OnInit } from '@angular/core';
import { faCircleExclamation, faGamepad } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss']
})
export class ErrorComponent implements OnInit {

  constructor() { }
  faCircleExclamation = faCircleExclamation
  faGamePad = faGamepad

  ngOnInit(): void {
  }

}
