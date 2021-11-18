import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { RouterModule, Routes } from '@angular/router';
import { SignInComponent } from './auth/sign-in/sign-in.component';
import { SignUpComponent } from './auth/sign-up/sign-up.component';
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

const routes : Routes= [
  {
  path: "sign-in", 
  component : SignInComponent
},
{ 
  path: "sign-up", 
  component : SignUpComponent
},
{ 
  path: "menu", 
  component : MenuComponent
},
{ 
  path: "gifts", 
  component : GiftsComponent
},
{ 
  path: "", 
  component : HomeComponent
},
]


@NgModule({
  declarations: [
    HomeComponent,
    MenuComponent,
    GiftsComponent
  ],
  imports: [
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
