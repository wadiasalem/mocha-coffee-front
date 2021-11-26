import { Injectable } from '@angular/core';
import {  Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuradService {

  constructor(private Router : Router) { }

  canUse(){
    if(localStorage.getItem('token'))
      return true;
    else{
      this.Router.navigate(['auth/sign-in']);
      return false;
    }
      
  }

}
