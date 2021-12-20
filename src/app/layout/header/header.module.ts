import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientComponent } from './client/client.component';
import { MatIconModule } from '@angular/material/icon';
import { MatBadgeModule } from '@angular/material/badge';
import { AdminComponent } from './admin/admin.component';
import { EmployerComponent } from './employer/employer.component';
import { foodDialog, logoutDialog, TableComponent } from './table/table.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { BrowserModule } from '@angular/platform-browser';



@NgModule({
  declarations: [
    foodDialog,
    logoutDialog,
    ClientComponent,
    AdminComponent,
    EmployerComponent,
    TableComponent,
  ],
  
  exports:[
    ClientComponent,
    AdminComponent,
    EmployerComponent,
    TableComponent,
  ],

  imports: [
    MatInputModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatDialogModule,
    MatBadgeModule,
    CommonModule,
    MatIconModule,
  ],
})
export class HeaderModule { }
