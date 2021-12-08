import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '@services/auth.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-coffee-orders',
  templateUrl: './coffee-orders.component.html',
  styleUrls: ['./coffee-orders.component.scss']
})
export class CoffeeOrdersComponent implements OnInit {

  history : Array<any>;
  details : Array<any>;

  datepipe: DatePipe = new DatePipe('en-US')

  constructor(private http : HttpClient,private auth : AuthService) { }

  ngOnInit(): void {
    
    let header = this.auth.getAuthorization();
    this.http.get(`${environment.API_URL}/client/orders`,{headers:header}).subscribe((data:any)=>{
      this.history = data.data ;
      
    },(error)=>{
      console.log(error);
    })
  }

  open(items:Array<any>){
    let header = this.auth.getAuthorization();
    this.http.post(
      `${environment.API_URL}/client/orders/detail`,
      {order : items},
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

  getQuantity(item:any,id:any)
  {
    return item.detail.find(
      (x: { product: number; commande:number}) => x.product == id && x.commande == item.order.id
      )?.quantity
  }

}
