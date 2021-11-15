import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {

  hide : boolean ;

  loginForm: FormGroup;

  constructor(private _formBuilder: FormBuilder) {
    this.hide = true ;
  }

  ngOnInit(): void {
    this.loginForm = this._formBuilder.group({
      email   : ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
  });
  }
  
  
}
