import { AfterViewChecked, AfterViewInit, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Routes } from '@angular/router';
import { AuthService } from '@services/auth.service';
const nav = [
  {
    id : '0',
    title : "General"
  },
  {
    id : '4',
    title : "My Cart"
  },
  {
    id : '5',
    title : "My Orders"
  },
  {
    id : '1',
    title : "Gift history"
  },
  {
    id : '2',
    title : "Orders history"
  },
  {
    id : '3',
    title : "Reservations history"
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

  nav : Array<{id:string,title:string}> = nav;

  selected : HTMLElement | null ;

  constructor(
    private auth : AuthService,
    private cdRef:ChangeDetectorRef,
    private route: ActivatedRoute,
    private routes : Router
    ) { 
    if(!this.auth.getIsConnected())
      {this.routes.navigate(['auth/sign-in'])}
    this.name = localStorage.getItem('name');
    this.points = localStorage.getItem('points');
  }


  ngAfterViewInit(): void {
    this.select('0');
    this.route.queryParams
      .subscribe(params => {
        if(params.cart=='y')
          this.select('4');
      }
    );
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

  navigation(id :string) : boolean{ 
    if(id==this.selected?.id)
      return true;
    else return false ;
  }

  logout(){
    this.auth.logout();
  }

}
