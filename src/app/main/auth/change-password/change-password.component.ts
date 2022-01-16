import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '@services/auth.service';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {

  changePasswordForm: FormGroup;
  errors : any = null;
  hidePassword : boolean = true;
  hideConfirmPassword : boolean = true;

  constructor(
    public _formBuilder: FormBuilder,
    route: ActivatedRoute,
    private Router : Router,
    public authService: AuthService,
  ) {
    if(this.authService.getIsConnected())
      this.Router.navigate(['/']);
    this.changePasswordForm = this._formBuilder.group({
      email: ['',[Validators.required,Validators.email]],
      password: ['',Validators.required],
      password_confirmation: ['',Validators.required],
      passwordToken: ['']
    }, {
      validator: MustMatch('password','password_confirmation')
  })
    route.queryParams.subscribe((params) => {
      this.changePasswordForm.controls['passwordToken'].setValue(params['token']);
    })
  }

  ngOnInit(): void {
    
  }

  onSubmit(){
    this.authService.resetPassword(this.changePasswordForm.value).subscribe(
      result => {
        alert('Password has been updated');
        this.Router.navigate(['/auth/sign-in']);
        this.changePasswordForm.reset();
      },
      error => {
        this.handleError(error);
        this.errors = error.error.description;
      }
    );
  }

  handleError(error:any) {
      let errorMessage = '';
      if (error.error instanceof ErrorEvent) {
          // client-side error
          errorMessage = `Error: ${error.error.message}`;
      } else {
          // server-side error
          errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
      }
      console.log(errorMessage);
      return throwError(errorMessage);
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