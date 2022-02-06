import { Injectable } from '@angular/core';
import { 
  HttpInterceptor, 
  HttpEvent, 
  HttpRequest, 
  HttpHandler, 
  HttpErrorResponse, 
  HttpClient} from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, retry, switchMap, take } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { AuthService } from '@services/auth.service';

@Injectable()
export class authInterceptor implements HttpInterceptor {

  constructor(
    private http : HttpClient,
    private auth : AuthService){
  }

  intercept(httpRequest: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    
    return next.handle(httpRequest).pipe(catchError((err: HttpErrorResponse): Observable<any> =>{
      //handle your auth error or rethrow
      if (err.status === 401) {
        
        return this.http.post(`${environment.API_URL}/auth/refresh-token`,{
          refresh : localStorage.getItem('refresh')
        }).pipe(switchMap((data : any)=>{
          if(data.error){
            this.auth.logout();
            return of(null);
          }else{
            localStorage.setItem("token", data.access_token);
            localStorage.setItem("refresh", data.refresh_token);
            localStorage.setItem("token_expire", data.expires_in);
            return next.handle(this.addAuthenticationToken(httpRequest,data.access_token));
          }
        }))
      }else{
        return throwError(err);
      }
    }));
  }


  private addAuthenticationToken(request: HttpRequest<any>,token : string): HttpRequest<any> {
    return request.clone({
      headers: request.headers.set("Authorization", "Bearer " + token)
    });
  }

}


