import { Component, OnInit } from '@angular/core';
import { AuthService } from '@services/auth.service';
interface menuItem {
  title : string,
  href : string
}

const menu : Array<menuItem> = [
  {
    title : "Check Reservations",
    href : "/employer/reservations"
  },
  {
    title : "Check Commands",
    href : "/employer/commands"
  },
];


@Component({
  selector: 'app-employer',
  templateUrl: './employer.component.html',
  styleUrls: ['./employer.component.scss']
})
export class EmployerComponent implements OnInit {

  menu :Array<menuItem>= menu;
  isconnected : boolean = false ;

  constructor(
    private auth : AuthService,) { 
  }

  ngOnInit(): void {
    this.auth.isConnected().subscribe((value)=>{
      this.isconnected = value;
    });
  }

  logout(){
    this.auth.logout();
  }


}
