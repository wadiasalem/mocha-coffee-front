import { Component, OnInit } from '@angular/core';
import {  FormBuilder, FormGroup , Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '@services/auth.service';


@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  hidePassword : boolean ;
  hideConfirmPassword : boolean ;

  registerForm: FormGroup;

  constructor(
    private _formBuilder: FormBuilder,
    private auth : AuthService,
    private Router : Router
    ) {
    this.hidePassword = true ;
    this.hideConfirmPassword = true ;
  }

  ngOnInit(): void {
    if(this.auth.getIsConnected())
      this.Router.navigate(['/']);
    this.registerForm = this._formBuilder.group({
      name   : ['', Validators.required],
      user_name   : ['', Validators.required],
      email   : ['', [Validators.required,Validators.email]],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required]
      }, {
        validator: MustMatch('password','confirmPassword')
    })
  }

  Authenticate(){
    this.auth.register(this.registerForm.value);
  }

  checkPassword  (){ 
    let pass = this.registerForm.get('password')!.value;
    let confirmPass = this.registerForm.get('confirmPassword')!.value;
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