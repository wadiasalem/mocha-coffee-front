import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '@services/auth.service';
import { CartService } from '@services/cart.service';

interface menuItem {
  title : string,
  href : string
}

const menu = [
  {
    title : "Menu",
    href : "/menu"
  },
  {
    title : "Rewards",
    href : "#"
  },
  {
    title : "Gift-Center",
    href : "/gifts"
  },
  {
    title : "Reservation",
    href : "#"
  },
  {
    title : "Order",
    href : "/order"
  }
];

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit , OnDestroy {

  menu :Array<menuItem>= menu;
  isconnected : boolean = false ;
  cart : {items:{[id: string]: number},length : number};

  constructor(private auth : AuthService,private _cart : CartService) { 
    this.cart = {items:{},length :0};
  }

  ngOnInit(): void {
    this.auth.isConnected().subscribe((value)=>{
      this.isconnected = value;
    });
    this._cart.getAll().subscribe((cart)=>{
      this.cart.items = cart;
      this.cart.length = Object.keys(cart).length;
    })
  }

  ngOnDestroy(){
  }

}
