import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable({
  providedIn: 'root'
})
export class SpinnerloadingService {

  requestCount = 0

  constructor(private spinnerService: NgxSpinnerService) { }

  onRequest(){
    this.requestCount++
    this.spinnerService.show(undefined, {
      type: "ball-fussion",
      bdColor: "rgb(27, 31, 36)",
      color: "rgb(255, 9, 134)"
    })
  }

  inactiveRequest(){
    this.requestCount--
    if(this.requestCount <= 0){
      this.requestCount = 0;
      this.spinnerService.hide();
    }
  }
}
