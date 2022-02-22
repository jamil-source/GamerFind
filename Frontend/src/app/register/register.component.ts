import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
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

  constructor(private accountService: AccountService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.regForm = new FormGroup({
      username: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(255)]),
      confirmPassword: new FormControl('', Validators.required),
    }, {validators: this.checkPasswords})
  }

  checkPasswords: ValidatorFn = (group: AbstractControl):  ValidationErrors | null => { 
    let pass = group.get('password').value;
    let confirmPass = group.get('confirmPassword').value
    return pass === confirmPass ? null : { notSame: true }
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
