import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientComponent } from './client/client.component';
import { HeaderComponent } from './header.component';



@NgModule({
  declarations: [
    ClientComponent,
    HeaderComponent
  ],
  imports: [
    CommonModule
  ],
  exports:[
    HeaderComponent

  ]
})
export class HeaderModule { }
