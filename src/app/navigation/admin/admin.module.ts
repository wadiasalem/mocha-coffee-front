import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';
import { RouterModule, Routes } from '@angular/router';
import { ManageTablesComponent,updateDialog } from './manage-tables/manage-tables.component';
import { addEmployer, ManageEmployersComponent } from './manage-employers/manage-employers.component';
import { CheckIncomeComponent } from './check-income/check-income.component';
import { CheckStockComponent } from './check-stock/check-stock.component';
import { HttpClientJsonpModule } from '@angular/common/http';
import { MatIconModule } from '@angular/material/icon';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatDialogModule} from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';



const routes : Routes = [
  {
    path : "check-stock",
    component : CheckStockComponent
  },
  {
  path : "check-income",
  component : CheckIncomeComponent
  }
  ,{
    path : "manage-tables",
    component : ManageTablesComponent
  },
  {
  path : "manage-employers",
  component : ManageEmployersComponent
}
];

@NgModule({
  declarations: [
    addEmployer,
    updateDialog,
    AdminComponent,
    ManageTablesComponent,
    ManageEmployersComponent,
    CheckIncomeComponent,
    CheckStockComponent
  ],
  imports: [
    MatSelectModule,
    MatInputModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatIconModule,
    HttpClientJsonpModule,
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class AdminModule { }
