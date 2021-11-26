import { isNull } from '@angular/compiler/src/output/output_ast';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
interface item {
  [id: string]: number;
}
@Injectable({
  providedIn: 'root'
})
export class CartService {

  cart : BehaviorSubject<item>;

  constructor() { 
    this.cart = new BehaviorSubject({});
  }

  add(id:string,quantity:number){
    let cart = this.cart.getValue();
    if(!cart[id]){
      cart[id] = quantity;
      this.cart.next(cart);
    }else{
      cart[id] = cart[id] + quantity;
      this.cart.next(cart);
    }
  }

  getAll():Observable<item>{
    return this.cart.asObservable();
  }
}
