import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '@services/auth.service';
import { PusherService } from '@services/pusher.service';
import { environment } from 'src/environments/environment';
interface menuItem {
  title : string,
  href : string
}

const menu : Array<menuItem> = [
  {
    title : "Check Reservations",
    href : "/employer/reservations"
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
  notif : number = 0 ;

  constructor(
    private auth : AuthService,
    private pusher : PusherService,
    private http : HttpClient) { 
  }

  ngOnInit(): void {
    this.auth.isConnected().subscribe((value)=>{
      this.isconnected = value;
    });

    const header = this.auth.getAuthorization();
    this.http.get(`${environment.API_URL}/employer/get-commands`,{headers : header})
    .subscribe((commands : any)=>{
      this.notif += commands.data.length; 
    },(error)=>{
      console.log(error)
    })

    this.pusher.channel.bind('created', (data : any) =>{
      if(data){
        this.notif += 1 ;
      }
    });
  }

  logout(){
    this.auth.logout();
  }


}
