import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuardService implements CanActivate{

  constructor(
    private router : Router) { }
  canActivate(
    route: ActivatedRouteSnapshot, 
    state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    if(localStorage.getItem('role') == '1' ){
      return true
    }else{
      switch (localStorage.getItem("role")) {
      case "2":
        this.router.navigate(["/"]);
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
  }
}
