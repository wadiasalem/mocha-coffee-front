import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '@services/auth.service';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-gift-orders',
  templateUrl: './gift-orders.component.html',
  styleUrls: ['./gift-orders.component.scss']
})
export class GiftOrdersComponent implements OnInit {

  history : Array<any>;
  details : Array<any>;

  datepipe: DatePipe = new DatePipe('en-US')

  constructor(private http : HttpClient,private auth : AuthService) { }

  ngOnInit(): void {
    
    let header = this.auth.getAuthorization();
    this.http.get(`${environment.API_URL}/client/commandes`,{headers:header}).subscribe((data:any)=>{
      this.history = data.data ;
    },(error)=>{
      console.log(error);
    })
  }

  open(items:Array<any>){
    let header = this.auth.getAuthorization();
    this.http.post(
      `${environment.API_URL}/client/commandes/detail`,
      {gifts : items},
      {headers:header}
    ).subscribe((data:any)=>{
      this.details = data.gifts ;
    },(error)=>{
      Swal.fire({
        title: "Erreur!",
        text: error.description,
        icon: "error",
      })
    })
  }

  close(){
    this.details=[];
  }

  test(item:any,id:any)
  {
    return item.detail.find((x: { gift: number; shop:number}) => x.gift == id && x.shop == item.command.id)?.quantity
  }


}
