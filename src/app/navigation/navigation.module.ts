import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
//services
import { AdminGuardService } from '@services/admin-guard.service';
import { AuthGuradService } from '@services/auth-gurad.service';
import { EmployerGuardService } from '@services/employer-guard.service';
import { TableGuardService } from '@services/table-guard.service';
//modules
import { AdminComponent } from './admin/admin.component';
import { EmployerComponent } from './employer/employer.component';
import { TableComponent } from './table/table.component';

const routes : Routes = [
  {
    path : "admin",
    canActivate : [AdminGuardService,AuthGuradService],
    loadChildren: () =>
      import("./admin/admin.module").then((m) => m.AdminModule),
    component : AdminComponent,
  },
  {
    path : "employer",
    canActivate : [EmployerGuardService,AuthGuradService],
    loadChildren: () =>
      import("./employer/employer.module").then((m) => m.EmployerModule),
    component : EmployerComponent
  },
  {
    path : "table",
    canActivate : [TableGuardService,AuthGuradService],
    loadChildren: () =>
      import("./table/table.module").then((m) => m.TableModule),
    component : TableComponent
  },
    
];

@NgModule({
  declarations: [
  ],
  imports: [
    RouterModule.forChild(routes),
  ]
})
export class NavigationModule { }
