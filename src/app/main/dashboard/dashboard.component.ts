import { AfterViewChecked, AfterViewInit, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AuthService } from '@services/auth.service';
const nav = [
  {
    id : '0',
    title : "General Account Settings"
  },
  {
    id : '1',
    title : "My Gift Orders"
  },
  {
    id : '2',
    title : "My Coffee Orders"
  },
  {
    id : '3',
    title : "My Reservations"
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

  constructor(private auth : AuthService,private cdRef:ChangeDetectorRef) { 
    this.name = localStorage.getItem('name');
    this.points = localStorage.getItem('points');
  }


  ngAfterViewInit(): void {
    this.select('0');
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
