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
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatDialogModule} from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatTabsModule} from '@angular/material/tabs';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { AddRewordComponent, ManageRewordsComponent } from './manage-rewords/manage-rewords.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';



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
},
{
  path : "manage-rewords",
  component : ManageRewordsComponent
}
];

@NgModule({
  declarations: [
    AddRewordComponent,
    addEmployer,
    updateDialog,
    AdminComponent,
    ManageTablesComponent,
    ManageEmployersComponent,
    CheckIncomeComponent,
    CheckStockComponent,
    ManageRewordsComponent
  ],
  imports: [
    MatNativeDateModule,
    MatDatepickerModule,
    FormsModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatTabsModule,
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
