import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '@services/auth.service';
import { PusherService } from '@services/pusher.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-check-commands',
  templateUrl: './check-commands.component.html',
  styleUrls: ['./check-commands.component.scss']
})
export class CheckCommandsComponent implements OnInit {

  commands : Array<any>;
  products : any ;
  @ViewChild('allCommmands') allCommmands : ElementRef ;
  selected : string ; 
  category : string | null = "";

  constructor(
    private auth : AuthService,
    private pusher : PusherService,
    private http : HttpClient) {
      this.category = localStorage.getItem('category');
    }

  ngOnInit(): void {

    const header = this.auth.getAuthorization();
    this.http.get(`${environment.API_URL}/employer/get-commands`,{headers : header})
    .subscribe((commands : any)=>{
      this.commands = commands.data ;
    },(error)=>{
      console.log(error)
    })

    this.pusher.channel.bind('created', (data : any) =>{
      if(data){
        const header = this.auth.getAuthorization();
        this.http.get(`${environment.API_URL}/employer/get-detail`,
        { params : {command : data.command.id} , headers : header})
        .subscribe((result:any)=>{
          const command = {
            command : data.command,
            buyer : data.buyer,
            detail : result.detail
          }
          this.commands.push(command);
        })
        
      }
    });

    this.pusher.channel.bind('updated', (data : any) =>{
      if(data){
        if(document.getElementById(data.id)){
          this.allCommmands.nativeElement.removeChild(document.getElementById(data.id));
        }
      }
    });
  }

  select(id : string,products : Array<any>){
    this.products = null ;
    if(id != this.selected){
      this.selected = id ;
      const header = this.auth.getAuthorization();
      this.http.post(`${environment.API_URL}/employer/get-products`,{items : products },
      {headers : header})
      .subscribe((products : any)=>{
        this.products = products ;
      },(error)=>{
        console.log(error)
      })
    }
    else
      this.selected = "";
  }

  action(id : string,todo : string){
    let toDo : string = todo ;
    if(toDo == "working"){
      if(localStorage.getItem("category")== "5")
      {
        toDo = "served";
      }else{
        toDo = "delivered";
      }
    }
    const header = this.auth.getAuthorization();
      this.http.patch(`${environment.API_URL}/employer/command-action`,
      {command : id , toDo : toDo },
      {headers : header})
      .subscribe((products : any)=>{
        if(document.getElementById(id)){
          this.allCommmands.nativeElement.removeChild(document.getElementById(id));
        }
        if(products.error?.length != 0){
          let $message = "In : ";
          products.error.forEach((element:any) => {
            $message += element.name+"   "
          });
          Swal.fire({
            title : "Stock Problem",
            text : $message,
            icon : "error"
          })
        }
      },(error)=>{
        console.log(error)
      })
  }


}
