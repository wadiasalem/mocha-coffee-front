import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';
import { CartService } from './cart.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private isconnected : BehaviorSubject<boolean>  ;

  constructor(private http : HttpClient,private router : Router,private cart:CartService) { 
    if(localStorage.getItem('token'))
      this.isconnected = new BehaviorSubject<boolean>(true);
    else
      this.isconnected = new BehaviorSubject<boolean>(false);
  }

  login(loginForm : any){
    this.http.post(`${environment.API_URL}/auth/login`, loginForm)
    .subscribe(
      (data: any) => {
        localStorage.setItem("token", data.access_token);
        localStorage.setItem("userId", data.user.id);
        localStorage.setItem("username", data.user.user_name);
        localStorage.setItem("role", data.user.role);
        localStorage.setItem("email", data.user.email);
        this.isconnected.next(true);
        switch (localStorage.getItem("role")) {
          case "1":
            this.router.navigate(["/admin"]);
            break;
          case "3":
            localStorage.setItem("table_number", data.table.table_number);
            this.router.navigate(["/table"]);
            break;
          case "4":
            localStorage.setItem("name", data.employer.name);
            localStorage.setItem("category", data.category);
            this.router.navigate(["/employer"]);
            break;
          default:
            localStorage.setItem("name", data.client.name);
            localStorage.setItem("points", data.client.points);
            localStorage.setItem("number", data.client.phone?data.client.phone:'');
            localStorage.setItem('address',data.client.address?data.client.address:'');
            this.router.navigate(["/"]);
            break;
        }
        Swal.fire({
          timer: 1000,
          title: data.description,
          icon: "success",
        });
      },
      (error) => {
        if (error) {
          console.log(error)
          Swal.fire({
            title: "Erreur!",
            text: error.error.description,
            icon: "error",
          });
        }
      }

      
    );
    
  }

  register(loginForm : any){
    this.http.post(`${environment.API_URL}/auth/register`, loginForm)
    .subscribe(
      (data: any) => {
        localStorage.setItem("token", data.access_token);
        localStorage.setItem("userId", data.user.id);
        localStorage.setItem("username", data.user.user_name);
        localStorage.setItem("role", data.user.role);
        localStorage.setItem("email", data.user.email);
        this.isconnected.next(true);
        
        switch (localStorage.getItem("role")) {
          case "1":this.router.navigate(["/admin"]);break;
          case "3":this.router.navigate(["/table"]);break;
          case "4":this.router.navigate(["/employer"]);break;
          default:
            localStorage.setItem("name", data.client.name);
            localStorage.setItem("points", data.client.points);
            localStorage.setItem("number", data.client.phone?data.client.phone:'');
            localStorage.setItem('address',data.client.address?data.client.address:'');
            this.router.navigate(["/"]);
            break;
        }
        Swal.fire({
          timer: 1000,
          title: data.description,
          icon: "success",
        });
      },
      (error) => {
        if (error) {
          console.log(error)
          Swal.fire({
            title: "Erreur!",
            text: error.error.description,
            icon: "error",
          });
        }
      }
      
    );
  }

  logout(){
    let option =this.getAuthorization();
    this.http.post(`${environment.API_URL}/logout`,null,{headers:option})
    .subscribe((data: any) => {
          localStorage.clear();
          this.cart.clearCart();
          this.isconnected.next(false);
          this.router.navigate(["/auth/sign-in"]);
        
      },(error)=>{
        console.log(error);
      });
    
  }

  getAuthorization():HttpHeaders{
    if(!localStorage.token)
      return new HttpHeaders();
    
    return new HttpHeaders({
      'Authorization': `Bearer ${localStorage.token}`
    });
  }

  isConnected() : Observable<boolean>{
    return this.isconnected.asObservable();
  }

  getIsConnected() : boolean{
    return this.isconnected.value;
  }
}
