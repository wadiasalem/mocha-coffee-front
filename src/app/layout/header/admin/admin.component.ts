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
    title : "Check Stock",
    href : "/admin/check-stock"
  },
  {
    title : "Check Income",
    href : "/admin/check-income"
  },
  {
    title : "Manage Tables",
    href : "/admin/manage-tables"
  },
  {
    title : "Manage Employers",
    href : "/admin/manage-employers"
  },
  {
    title : "Manage Rewords",
    href : "/admin/manage-rewords"
  }
];

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  menu :Array<menuItem>= menu;
  isconnected : boolean = false ;

  constructor(
    private auth : AuthService,) { 
  }

  ngOnInit(): void {
    this.auth.isConnected().subscribe((value)=>{
      this.isconnected = value;
    });
  }

  logout(){
    this.auth.logout();
  }


}
