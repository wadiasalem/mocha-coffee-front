import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ClientGuardService implements CanActivate{

  constructor(
    private _auth : AuthService,
    private Router : Router) { }
  canActivate(
    route: ActivatedRouteSnapshot, 
    state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    if(localStorage.getItem('role') == '2' ){
      return true
    }else{
      if(this._auth.getIsConnected() == true){
        this._auth.logout();
      }
      this.Router.navigate(['auth/sign-in']);
      return false;
    } 
  }
}
