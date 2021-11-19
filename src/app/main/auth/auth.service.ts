import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http : HttpClient,private router : Router) { }

  login(loginForm : any){
    this.http.post(`${environment.API_URL}/auth/login`, loginForm)
    .subscribe(
      (data: any) => {
        
        window.localStorage.setItem("token", data.access_token);
        localStorage.setItem("userId", data.user.id);
        localStorage.setItem("username", data.user.user_name);
        localStorage.setItem("role", data.user.role);
        localStorage.setItem("name", data.user.name);
        localStorage.setItem("email", data.user.email);
        if(localStorage.getItem("role")=="1") {
          this.router.navigate(["/"]);
        }
        else{
          this.router.navigate(["/"]);

        }

        console.log(localStorage);
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

  getAuthorization():HttpHeaders{
    if(!localStorage.token)
      return new HttpHeaders();
    
    return new HttpHeaders({
      'Authorization': `Bearer ${localStorage.token}`
    });
  }
}
