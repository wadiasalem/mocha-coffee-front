import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { RouterModule, Routes } from '@angular/router';
import { SignInComponent } from './auth/sign-in/sign-in.component';
import { SignUpComponent } from './auth/sign-up/sign-up.component';
import { MenuComponent } from './menu/menu.component';
import {TemplateModule} from '../template/template.module';
import { HttpClientModule } from '@angular/common/http';

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
  path: "", 
  component : HomeComponent
},
]


@NgModule({
  declarations: [
    HomeComponent,
    SignInComponent,
    SignUpComponent,
    MenuComponent
  ],
  imports: [
    HttpClientModule,
    TemplateModule,
    CommonModule,
    RouterModule.forChild(routes),
  ]
})
export class MainModule { }
