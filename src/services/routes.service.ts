import { Injectable } from '@angular/core';
import { Routes } from '@angular/router';
import { CartComponent } from 'src/app/main/dashboard/cart/cart.component';
import { DashboardComponent } from 'src/app/main/dashboard/dashboard.component';
import { GeneralSettingsComponent } from 'src/app/main/dashboard/general-settings/general-settings.component';
import { RewordsComponent } from 'src/app/main/rewords/rewords.component';
import { GiftsComponent } from '../app/main/gifts/gifts.component';
import { HomeComponent } from '../app/main/home/home.component';
import { MenuComponent } from '../app/main/menu/menu.component';
import { ReservationComponent } from '../app/main/reservation/reservation.component';

export const routes : Routes= [
  { 
    path: "home", 
    component : HomeComponent,
  },
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
    path: "rewords", 
    component : RewordsComponent
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
    path: "dashboard", 
    component : DashboardComponent,
    children : [
      {
        path : "settings",
        component : GeneralSettingsComponent
      },
      {
        path : "my-cart",
        component : CartComponent
      },
    ]
    
  },
]

@Injectable({
  providedIn: 'root'
})
export class RoutesService {

  constructor() { }
}
