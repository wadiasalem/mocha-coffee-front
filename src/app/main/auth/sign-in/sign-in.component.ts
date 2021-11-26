import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthGuradService } from '../auth-gurad.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {

  hide : boolean ;

  loginForm: FormGroup;
  maxPrice : number = 100;

  constructor(
    private _formBuilder: FormBuilder,
    private authGuard : AuthGuradService,
    private auth : AuthService) {
    this.hide = true ;
  }

  ngOnInit(): void {
    this.authGuard.isConnected(['/']);
    this.loginForm = this._formBuilder.group({
        login   : ['', [Validators.required, Validators.email]],
        password: ['', Validators.required],
        remember : ['']
    });
    
  }

  Authenticate(){
    console.log(this.loginForm.value);
    this.auth.login(this.loginForm.value);

  }
  
  
}
