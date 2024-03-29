import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';

import { MatFormFieldModule } from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { ChangePasswordRequestComponent } from './change-password-request/change-password-request.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
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
  path: "password-request", 
  component : ChangePasswordRequestComponent
},
{ 
  path: "change-password", 
  component : ChangePasswordComponent
}
]

@NgModule({
  declarations: [
    SignInComponent,
    SignUpComponent,
    ChangePasswordRequestComponent,
    ChangePasswordComponent,
  ],
  imports: [
    RouterModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    CommonModule,
    MatIconModule,
    MatInputModule,
    MatCheckboxModule,
    MatButtonModule,
    RouterModule.forChild(routes),
  ]
})
export class AuthModule { }
