import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { RouterModule, Routes } from '@angular/router';
import { MenuComponent } from './menu/menu.component';
import {TemplateModule} from '../template/template.module';
import { HttpClientModule } from '@angular/common/http';
import { AuthModule } from './auth/auth.module';
import { GiftsComponent } from './gifts/gifts.component';
import {MatDividerModule} from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import {MatRippleModule} from '@angular/material/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import {MatSelectModule} from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { OrderComponent } from './order/order.component';
import { ReservationComponent } from './reservation/reservation.component';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { routes } from '@services/routes.service';
import { DashboardModule } from './dashboard/dashboard.module';

@NgModule({
  declarations: [
    HomeComponent,
    MenuComponent,
    GiftsComponent,
    OrderComponent,
    ReservationComponent,
  ],
  imports: [
    DashboardModule,
    MatSnackBarModule,
    FormsModule,
    MatSelectModule,
    MatInputModule,
    MatRippleModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatButtonToggleModule,
    MatButtonModule,
    MatDividerModule,
    MatIconModule,
    AuthModule,
    HttpClientModule,
    TemplateModule,
    CommonModule,
    RouterModule.forChild(routes),
  ]
})
export class MainModule { }
