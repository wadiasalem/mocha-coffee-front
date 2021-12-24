import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '@services/auth.service';
import { PusherService } from '@services/pusher.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-employer',
  templateUrl: './employer.component.html',
  styleUrls: ['./employer.component.scss']
})
export class EmployerComponent implements OnInit {

  
  toDay : any;
  datepipe : DatePipe = new DatePipe('en-US');
  name : string | null = "";
  employer :any;
  selected : boolean = false ;
  category : string |null = "";

  constructor(
    private pusher : PusherService,
    private route : ActivatedRoute,
    private http:HttpClient,
    private _auth : AuthService) { }

  ngOnInit(): void {

    const header = this._auth.getAuthorization();
    this.http.get(`${environment.API_URL}/employer/get-stat`,{headers : header})
      .subscribe((data:any)=>{
        this.employer = data.data ;
      })

    setInterval(() => {
      this.toDay = this.datepipe.transform(new Date(), 'dd-MM-YYYY HH:mm:ss') ;
    }, 1);

    this.route.firstChild?.url.subscribe((data)=>{
      this.selected = true;
    })

    this.name = localStorage.getItem('name');
    this.category = localStorage.getItem('category');

  }

}
