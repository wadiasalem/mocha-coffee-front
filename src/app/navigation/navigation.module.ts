import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AdminModule } from './admin/admin.module';
import { AdminComponent } from './admin/admin.component';
import { EmployerComponent } from './employer/employer.component';
import { EmployerModule } from './employer/employer.module';

const routes : Routes = [
  {
    path : "admin",
    loadChildren: () =>
      import("./admin/admin.module").then((m) => m.AdminModule),
    component : AdminComponent,
  },
  {
    path : "emplyer",
    loadChildren: () =>
      import("./employer/employer.module").then((m) => m.EmployerModule),
    component : EmployerComponent
  },
    
];

@NgModule({
  declarations: [
  ],
  imports: [
    AdminModule,
    EmployerModule,
    RouterModule.forChild(routes),
  ]
})
export class NavigationModule { }
