import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '@services/auth.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-check-reservations',
  templateUrl: './check-reservations.component.html',
  styleUrls: ['./check-reservations.component.scss']
})
export class CheckReservationsComponent implements OnInit {

  reservations : any ;
  constructor(
    private http : HttpClient,
    private _auth : AuthService) { }

  ngOnInit(): void {
    const header = this._auth.getAuthorization();

    this.http.get(`${environment.API_URL}/employer/get-reservations`,{headers : header})
    .subscribe((result : any)=>{
      this.reservations = result.reservations ;
    },((error : any)=>{
      console.log(error);
    }))
  }

}
