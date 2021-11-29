import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '@services/auth.service';
import { CartService } from '@services/cart.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {


  cart :{
    items : Array<{
      id :number
      name : string,
      price : number,
      quantity :number
    }>,
    length : number,
    total : number
  } ;

  ShippingFormGroup: FormGroup; 
  PaymentForma : FormGroup;

  constructor(
    private _formBuilder: FormBuilder,
    private _cart : CartService,
    private http : HttpClient,
    private auth : AuthService
    ) {
    this._cart.getAll().subscribe((data)=>{
      this.cart = data ;
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
    this._cart.clearCart();
  }

  shipping(){
    let header = this.auth.getAuthorization();
    let cart = this._cart.getCart();
    this.http.post(
      `${environment.API_URL}/client/shop`,
      {cart : cart.items},
      {headers:header}).subscribe((result:any)=>{
        this._cart.clearCart();
        Swal.fire({
          imageUrl: 'assets/mocha/yee.png',
          imageHeight : '150',
          title: result.description,
          icon: "success",
        });
    },(error)=>{
      Swal.fire({
        title: "Erreur!",
          text: error.description,
          icon: "error",
      });
    })
  }

  
}
