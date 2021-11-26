import { Injectable } from '@angular/core';
import { Routes } from '@angular/router';
import { DashboardComponent } from 'src/app/main/dashboard/dashboard.component';
import { GiftsComponent } from '../app/main/gifts/gifts.component';
import { HomeComponent } from '../app/main/home/home.component';
import { MenuComponent } from '../app/main/menu/menu.component';
import { OrderComponent } from '../app/main/order/order.component';
import { ReservationComponent } from '../app/main/reservation/reservation.component';

export const routes : Routes= [
  {
  path: "auth", 
  loadChildren: () =>
    import("../app/main/auth/auth.module").then(((m)=>m.AuthModule)),
},
{ 
  path: "menu", 
  component : MenuComponent
},
{ 
  path: "reservation", 
  component : ReservationComponent
},
{ 
  path: "gifts", 
  component : GiftsComponent
},
{ 
  path: "order", 
  component : OrderComponent
},
{ 
  path: "dashboard", 
  component : DashboardComponent
},
{ 
  path: "", 
  component : HomeComponent
},
]

@Injectable({
  providedIn: 'root'
})
export class RoutesService {

  constructor() { }
}
