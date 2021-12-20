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
    private router : Router) { }
  canActivate(
    route: ActivatedRouteSnapshot, 
    state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {

    if(this._auth.getIsConnected()){
      if(localStorage.getItem('role') == '2' ){
        return true;
      }else{
        switch (localStorage.getItem("role")) {
          case "1":
            this.router.navigate(["/admin"]);
            break;
          case "3":
            this.router.navigate(["/table"]);
            break;
          case "4":
            this.router.navigate(["/employer"]);
            break;
          }
        return false;
      } 
    }else{
      return true;
    }
  }
}
