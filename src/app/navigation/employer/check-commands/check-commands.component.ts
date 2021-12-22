import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '@services/auth.service';
import { PusherService } from '@services/pusher.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-check-commands',
  templateUrl: './check-commands.component.html',
  styleUrls: ['./check-commands.component.scss']
})
export class CheckCommandsComponent implements OnInit {

  commands : any;
  products : any ;
  @ViewChild('allCommmands') allCommmands : ElementRef ;
  selected : string ; 

  constructor(
    private auth : AuthService,
    private pusher : PusherService,
    private http : HttpClient) { }

  ngOnInit(): void {

    const header = this.auth.getAuthorization();
    this.http.get(`${environment.API_URL}/employer/get-commands`,{headers : header})
    .subscribe((commands : any)=>{
      console.log(commands);
      this.commands = commands ;
    },(error)=>{
      console.log(error)
    })

    this.pusher.channel.bind('created', (data : any) =>{
      
      if(data){
        const div = document.createElement('div');
        div.append(data.command.id)
        this.allCommmands.nativeElement.appendChild(div);
      }
    });
  }

  select(id : string,products : Array<any>){
    if(id != this.selected){
      this.selected = id ;
      const header = this.auth.getAuthorization();
      this.http.post(`${environment.API_URL}/employer/get-products`,{items : products },
      {headers : header})
      .subscribe((products : any)=>{
        console.log(products);
        this.products = products ;
      },(error)=>{
        console.log(error)
      })
    }
    else
      this.selected = "";
  }

}
