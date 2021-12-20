import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableComponent } from './table.component';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatRippleModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';



@NgModule({
  declarations: [
    TableComponent
  ],
  imports: [
    MatInputModule,
    MatButtonModule,
    MatRippleModule,
    MatFormFieldModule,
    MatIconModule,
    CommonModule
  ]
})
export class TableModule { }
