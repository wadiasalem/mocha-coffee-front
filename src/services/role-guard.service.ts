import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuardService {

  constructor(private route : Router,private _auth : AuthService) { }
  

  roleCheck(role : Array<string>){
    let localRole = localStorage.getItem('role');
    let result = false ;
    role.forEach(element => {
      if(element == localRole){
        result =  true;
      }
    });

    if(!result){
      this._auth.logout();
    }
    
  }
}
