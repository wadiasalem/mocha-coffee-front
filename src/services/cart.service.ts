
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
interface item {
  items : Array<{
    id :number
    name : string,
    price : number,
    quantity :number
  }>,
  length : number,
  total : number
}
@Injectable({
  providedIn: 'root'
})
export class CartService {

  cart : BehaviorSubject<any> ;

  constructor() {
    let cartString = localStorage.getItem('cart');
    if(cartString)
      this.cart = new BehaviorSubject(JSON.parse(cartString ) );
    else
      this.cart = new BehaviorSubject({items : [],length :0,total : 0});
  }

  add(id:string,quantity:number,name : string , price : number){
    let cart = this.cart.getValue();
    if(!cart.items[id]){
      cart.items[id]={
        id : id,
        name : name,
        price : price,
        quantity : quantity
      }
      this.cart.next(cart);
    }else{
      cart.items[id].quantity +=  quantity;
      this.cart.next(cart);
    }
    cart.length += quantity ;
    cart.total+=quantity*price;
    this.store();
  }

  getAll():Observable<item>{
    return this.cart.asObservable();
  }

  getCart(){
    return this.cart.value;
  }

  clearCart(){
    this.cart.next({items : [],length :0,total : 0}) ;
    localStorage.removeItem('cart');
  }

  store(){
    localStorage.setItem('cart',JSON.stringify(this.cart.getValue()));
  }

}
