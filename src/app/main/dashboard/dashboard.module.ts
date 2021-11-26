import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GeneralSettingsComponent } from './general-settings/general-settings.component';
import { DashboardComponent } from './dashboard.component';
import { MatDividerModule } from '@angular/material/divider';
import { TemplateModule } from 'src/app/template/template.module';
import { GiftOrdersComponent } from './gift-orders/gift-orders.component';
import { CoffeeOrdersComponent } from './coffee-orders/coffee-orders.component';
import { ReservationsComponent } from './reservations/reservations.component';



@NgModule({
  declarations: [
    GeneralSettingsComponent,
    DashboardComponent,
    GiftOrdersComponent,
    CoffeeOrdersComponent,
    ReservationsComponent
  ],
  exports:[
    DashboardComponent,
  ],
  imports: [
    CommonModule,
    MatDividerModule,
    TemplateModule,
  ]
})
export class DashboardModule { }
