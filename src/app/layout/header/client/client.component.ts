import { Component, OnInit } from '@angular/core';
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
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss']
})
export class ClientComponent implements OnInit {

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

  opened : boolean = false ; 

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
    
    document.addEventListener('mouseup', this.closeMenu.bind(this));

  }

  closeMenu(e:any){
    const elementDiv = document.getElementById("accountMenu");
    const elementIcon = document.getElementById("accountIcon");
    if (!elementDiv?.contains(e.target as Node) && !elementIcon?.contains(e.target as Node)) {
      elementDiv?.classList.remove("open");
      this.opened = false;
  }
  }


  logout(){
    this.auth.logout();
  }

  openMenu(){
    const element = document.getElementById("accountMenu");
    if(!this.opened){
      element?.classList.add("open");
    }else{
      element?.classList.remove("open");
    }
    this.opened = !this.opened
  }


}
