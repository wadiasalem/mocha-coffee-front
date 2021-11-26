import { Component, OnInit } from '@angular/core';
import {  FormBuilder, FormGroup , Validators } from '@angular/forms';
import { AuthGuradService } from '../auth-gurad.service';


@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  hidePassword : boolean ;
  hideConfirmPassword : boolean ;

  loginForm: FormGroup;

  constructor(private _formBuilder: FormBuilder,private authGuard : AuthGuradService) {
    this.hidePassword = true ;
    this.hideConfirmPassword = true ;
  }

  ngOnInit(): void {
    this.authGuard.isConnected(['/']);
    this.loginForm = this._formBuilder.group({
      firstName   : ['', Validators.required],
      lastName   : ['', Validators.required],
      email   : ['', [Validators.required,Validators.email]],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required]
  }, {
    validator: MustMatch('password','confirmPassword')
})
  }

  

  checkPassword  (){ 
    let pass = this.loginForm.get('password')!.value;
    let confirmPass = this.loginForm.get('confirmPassword')!.value;
    return pass === confirmPass ? false : true
  }

}

export function MustMatch(controlName: string, matchingControlName: string) {
  return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];

      if (matchingControl.errors && !matchingControl.errors.mustMatch) {
          // return if another validator has already found an error on the matchingControl
          return;
      }

      // set error on matchingControl if validation fails
      if (control.value !== matchingControl.value) {
          matchingControl.setErrors({ mustMatch: true });
      } else {
          matchingControl.setErrors(null);
      }
  }
}