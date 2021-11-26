import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientComponent } from './client/client.component';
import { HeaderComponent } from './header.component';
import { MatIconModule } from '@angular/material/icon';



@NgModule({
  declarations: [
    ClientComponent,
    HeaderComponent
  ],
  imports: [
    CommonModule,
    MatIconModule
  ],
  exports:[
    HeaderComponent

  ]
})
export class HeaderModule { }
