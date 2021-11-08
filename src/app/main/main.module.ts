import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { RouterModule, Routes } from '@angular/router';
import { SignInComponent } from './auth/sign-in/sign-in.component';
import { SignUpComponent } from './auth/sign-up/sign-up.component';

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
  path: "", 
  component : HomeComponent
},
]


@NgModule({
  declarations: [
    HomeComponent,
    SignInComponent,
    SignUpComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ]
})
export class MainModule { }
