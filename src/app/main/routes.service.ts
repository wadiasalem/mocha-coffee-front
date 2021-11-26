import { Injectable } from '@angular/core';
import { Routes } from '@angular/router';
import { SignInComponent } from './auth/sign-in/sign-in.component';
import { SignUpComponent } from './auth/sign-up/sign-up.component';
import { GiftsComponent } from './gifts/gifts.component';
import { HomeComponent } from './home/home.component';
import { MenuComponent } from './menu/menu.component';
import { OrderComponent } from './order/order.component';
import { ReservationComponent } from './reservation/reservation.component';

export const routes : Routes= [
  {
  path: "auth", 
  loadChildren: () =>
    import("./auth/auth.module").then(((m)=>m.AuthModule)),
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
