import { Component, Input, OnInit, Self } from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';

@Component({
  selector: 'app-form-text-handler',
  templateUrl: './form-text-handler.component.html',
  styleUrls: ['./form-text-handler.component.scss']
})
export class FormTextHandlerComponent implements ControlValueAccessor {
  @Input() label: string;
  @Input() type = "";

  constructor(@Self() public ngControl: NgControl) {
    this.ngControl.valueAccessor = this
  }

  writeValue(obj: any): void {
  }

  registerOnChange(fn: any): void {
  }

  registerOnTouched(fn: any): void {
  }


}
