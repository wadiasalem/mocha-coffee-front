import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GeneralSettingsComponent } from './general-settings/general-settings.component';
import { DashboardComponent } from './dashboard.component';
import { MatDividerModule } from '@angular/material/divider';
import { TemplateModule } from 'src/app/template/template.module';
import { GiftOrdersComponent } from './gift-orders/gift-orders.component';
import { CoffeeOrdersComponent } from './coffee-orders/coffee-orders.component';
import { ReservationsComponent } from './reservations/reservations.component';
import { CartComponent } from './cart/cart.component';
import {MatStepperModule} from '@angular/material/stepper';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import {MatExpansionModule} from '@angular/material/expansion';
import { HttpClientModule } from '@angular/common/http';



@NgModule({
  declarations: [
    GeneralSettingsComponent,
    DashboardComponent,
    GiftOrdersComponent,
    CoffeeOrdersComponent,
    ReservationsComponent,
    CartComponent
  ],
  exports:[
    DashboardComponent,
  ],
  imports: [
    CommonModule,
    MatDividerModule,
    TemplateModule,
    MatStepperModule,
    MatFormFieldModule,
    FormsModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatIconModule,
    MatExpansionModule,
    HttpClientModule
  ]
})
export class DashboardModule { }
