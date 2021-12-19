import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '@services/auth.service';

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
    private auth : AuthService,
    private Router : Router) {
    this.hide = true ;
  }

  ngOnInit(): void {
    if(this.auth.getIsConnected())
      this.Router.navigate(['/']);
    this.loginForm = this._formBuilder.group({
        login   : ['', [Validators.required]],
        password: ['', Validators.required],
        remember : ['']
    });
    
    window.scrollTo(0,0);
  }

  Authenticate(){
    this.auth.login(this.loginForm.value);
  }
  
  
}
