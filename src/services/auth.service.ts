import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isconnected : BehaviorSubject<boolean>  ;

  constructor(private http : HttpClient,private router : Router) { 
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
        if(localStorage.getItem("role")=="2") {
          localStorage.setItem("name", data.client.name);
          localStorage.setItem("points", data.client.points);
          this.router.navigate(["/"]);
        }
        else{
          this.router.navigate(["/"]);

        }
      },
      (error) => {
        if (error) {
          // Swal.fire({
          //   title: "Erreur!",
          //   text: "Email ou mot de passe erroné.",
          //   icon: "error",
          // });
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
        if(localStorage.getItem("role")=="2") {
          localStorage.setItem("name", data.client.name);
          localStorage.setItem("points", data.client.points);
          this.router.navigate(["/"]);
        }
        else{
          this.router.navigate(["/"]);

        }
      },
      (error) => {
        if (error) {
          // Swal.fire({
          //   title: "Erreur!",
          //   text: "Email ou mot de passe erroné.",
          //   icon: "error",
          // });
        }
      }
      
    );
  }

  logout(){
    let option =this.getAuthorization();
    this.http.post(`${environment.API_URL}/auth/logout`,null,{headers:option})
    .subscribe(
      (data: any) => {
        if(data.status == 'success'){
          localStorage.clear();
          this.isconnected.next(false);
          this.router.navigate(["/"]);
        }
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
