import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDividerModule } from '@angular/material/divider';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import {MatBadgeModule} from '@angular/material/badge';
import { ClientComponent } from './header/client/client.component';
import { HeaderModule } from './header/header.module';



@NgModule({
  declarations: [
    FooterComponent,
    HeaderComponent,
  ],
  exports:[
    FooterComponent,
    HeaderComponent,
  ],
  imports: [
    CommonModule,
    MatDividerModule,
    MatButtonModule,
    MatIconModule,
    HeaderModule
  ]
})
export class LayoutModule { }
