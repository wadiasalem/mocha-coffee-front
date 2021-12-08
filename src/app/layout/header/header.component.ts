import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@services/auth.service';
import { CartService } from '@services/cart.service';
import { OrderService } from '@services/order.service';

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
    href : "/rewords"
  },
  {
    title : "Gift-Center",
    href : "/gifts"
  },
  {
    title : "Reservation",
    href : "/reservation"
  }
];

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  menu :Array<menuItem>= menu;
  isconnected : boolean = false ;
  cart : {
    items : Array<any>,
    length : number,
    total : number
  };

  food : {
    items : Array<any>,
    length : number,
    total : number
  };

  constructor(
    private auth : AuthService,
    private _food : OrderService,
    private _cart : CartService) { 
    this.cart = {items:[],length :0,total:0};
  }

  ngOnInit(): void {
    this.auth.isConnected().subscribe((value)=>{
      this.isconnected = value;
    });
    this._cart.getAll().subscribe((cart)=>{
      this.cart = cart;
    })
    this._food.getAll().subscribe((food)=>{
      this.food = food;
    })
  }


}
