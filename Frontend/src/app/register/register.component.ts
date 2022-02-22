import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from '../shared/services/account.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})

export class RegisterComponent implements OnInit {
  @Output() cancelRegister = new EventEmitter();
  model: any = {};
  regForm: FormGroup;
  maxDate: Date;
  bsConfig: Partial<BsDatepickerConfig>;

  constructor(private accountService: AccountService, private toastr: ToastrService) {
    // Datepicker configuration
    this.bsConfig = {
      dateInputFormat: 'DD MMMM YYYY'
    }
  }

  ngOnInit(): void {
    this.maxDate = new Date();
    this.maxDate.setFullYear(this.maxDate.getFullYear() -18)
    this.regForm = new FormGroup({
      gameType: new FormControl('PVE'),
      username: new FormControl('', Validators.required),
      dateOfBirth: new FormControl('', Validators.required),
      country: new FormControl('', Validators.required),
      city: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(255)]),
      confirmPassword: new FormControl('', [Validators.required, this.checkPwdMatch('password')]),
    })
  }

  checkPwdMatch(match: string): ValidatorFn {
    return (control: AbstractControl) => {
      return control?.value === control?.parent?.controls[match].value ? null : { matching: true }
    }
  }



  register() {
    this.accountService.register(this.model).subscribe(res => {
      console.log(res);
      this.cancel();
    }, err => {
      let errors = err.error.errors;
      let errorMessages: string[] = []
      if (errors) {
        for (const er in errors) {
          if (errors[er]) {
            errorMessages.push(errors[er])
          }
        }
      }
      let messages: string = ""
      errorMessages.forEach(message => {
        return messages += " " + message;
      });
      this.toastr.error(messages)
    })
  }

  cancel() {
    this.cancelRegister.emit(false);
  }

}
