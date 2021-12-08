import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '@services/auth.service';
import { OrderService } from '@services/order.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {

  order :{
    items : Array<any>,
    length : number,
    total : number
  } ;

  ShippingFormGroup: FormGroup; 
  PaymentForma : FormGroup;

  constructor(
    private _formBuilder: FormBuilder,
    private _order : OrderService,
    private http : HttpClient,
    private auth : AuthService
    ) {
    this._order.getAll().subscribe((data)=>{
      this.order = data ;
    })
  }

  ngOnInit() {
    let address = localStorage.getItem('address');
    
    this.ShippingFormGroup = this._formBuilder.group({
      address: [address?address:'', [Validators.required,Validators.maxLength(255)]],
    });

    this.PaymentForma = this._formBuilder.group({
      cartNumber : ['',[Validators.required,Validators.pattern("[0-9]{16}$")]],
      date: ['', [Validators.required,Validators.pattern("[0-9]{2}/{1}[0-9]{2}$")]],
      cvv : ['',[Validators.required,Validators.pattern("[0-9]{3}$")]],
    });
  }

  clearCart(){
    this._order.clearfood();
  }

  shipping(){
    let header = this.auth.getAuthorization();
    let cart = this._order.getfood();
    this.http.post(
      `${environment.API_URL}/client/order`,
      {order : cart.items},
      {headers:header}).subscribe((result:any)=>{
        this._order.clearfood();
        Swal.fire({
          imageUrl: 'assets/mocha/yee.png',
          imageHeight : '150',
          title: result.description,
          icon: "success",
        });
    },(error)=>{
      console.log(error)
      Swal.fire({
        title: "Erreur!",
          text: error.description,
          icon: "error",
      });
    })
  }

}
