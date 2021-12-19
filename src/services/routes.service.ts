import { Injectable } from '@angular/core';
import { Routes } from '@angular/router';
import { RewordsComponent } from 'src/app/main/rewords/rewords.component';
import { GiftsComponent } from '../app/main/gifts/gifts.component';
import { HomeComponent } from '../app/main/home/home.component';
import { MenuComponent } from '../app/main/menu/menu.component';
import { ReservationComponent } from '../app/main/reservation/reservation.component';
import { AuthGuradService } from './auth-gurad.service';

export const routes : Routes= [
  { 
    path: "", 
    component : HomeComponent,
    pathMatch : "full"
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
    component : ReservationComponent,
    canActivate : [AuthGuradService]
  },
  { 
    path: "gifts", 
    component : GiftsComponent
  },
  { 
    path: "dashboard", 
    canActivate : [AuthGuradService],
    loadChildren:()=>
    import("../app/main/dashboard/dashboard.module").then((m)=>m.DashboardModule),
  },
]

@Injectable({
  providedIn: 'root'
})
export class RoutesService {

  constructor() { }
}
