import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RoleGuardService {

  constructor() { }
  

  roleCheck(role : any){
    if(localStorage.getItem('roleID')==role)
      return true;
    else
      return false;
  }
}
