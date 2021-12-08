import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';
import { RouterModule, Routes } from '@angular/router';
import { ManageTablesComponent } from './manage-tables/manage-tables.component';
import { ManageEmployersComponent } from './manage-employers/manage-employers.component';

const routes : Routes = [
 {
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
    AdminComponent,
    ManageTablesComponent,
    ManageEmployersComponent
  ],
  imports: [
    RouterModule.forChild(routes)
  ]
})
export class AdminModule { }
