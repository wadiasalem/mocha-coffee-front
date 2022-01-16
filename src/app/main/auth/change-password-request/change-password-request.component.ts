import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '@services/auth.service';

@Component({
  selector: 'app-change-password-request',
  templateUrl: './change-password-request.component.html',
  styleUrls: ['./change-password-request.component.scss']
})
export class ChangePasswordRequestComponent implements OnInit {

  resetForm: FormGroup;
  errors = null;
  successMsg : any = null;

  constructor(
    public _formBuilder: FormBuilder,
    public _auth: AuthService,
    private Router : Router
  ) {
    if(this._auth.getIsConnected())
      this.Router.navigate(['/']);
    this.resetForm = this._formBuilder.group({
      email: ['', [Validators.required, Validators.email]]
    })
  }

  ngOnInit(): void {
    
   }

  onSubmit(){
    this._auth.sendResetPasswordLink(this.resetForm.value).subscribe(
      (result:any) => {
        alert(result.description);
        this.Router.navigate(['/']);
      },(error) => {
        this.errors = error.error.description;
      })
  }

}
