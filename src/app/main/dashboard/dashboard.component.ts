import { HttpClient } from '@angular/common/http';
import { AfterViewChecked, AfterViewInit, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Routes } from '@angular/router';
import { AuthService } from '@services/auth.service';
import { environment } from 'src/environments/environment';
const nav = [
  {
    title : "General",
    path : "settings"
  },
  {
    title : "My Cart",
    path : "my-cart"
  },
  {
    title : "My Orders",
    path : "my-orders"
  },
  {
    title : "Gift history",
    path : "gift-history"
  },
  {
    title : "Orders history",
    path : "order-history"
  }
]
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit,AfterViewChecked,AfterViewInit {

  name : string | null;
  points : string | null;

  nav : Array<any> = nav;

  selected : HTMLElement | null ;

  constructor(
    private auth : AuthService,
    private cdRef:ChangeDetectorRef,
    private route: ActivatedRoute,
    private http : HttpClient
    ) { 
    this.name = localStorage.getItem('name');
    this.points = localStorage.getItem('points');
  }


  ngAfterViewInit(): void {
    const header  = this.auth.getAuthorization();
    this.http.get(`${environment.API_URL}/client/getPoints`,{headers : header})
    .subscribe((result : any)=>{
      this.points = result.points;
      localStorage.setItem("points", result.points);
    },(error)=>{
      console.log(error)
    })
    let path = this.route.firstChild?.snapshot.routeConfig?.path
    let id : string =  path ? path: 'settings';

    this.select(id);

  }

  ngAfterViewChecked(): void {
    this.cdRef.detectChanges();
  }

  ngOnInit(): void {
    
  }
  
  select(id : string){
    if(this.selected != document.getElementById(id)){
      this.selected?.classList.remove('selected');
      this.selected = document.getElementById(id);
      this.selected?.classList.add('selected');
    }
  }

  logout(){
    this.auth.logout();
  }

}
