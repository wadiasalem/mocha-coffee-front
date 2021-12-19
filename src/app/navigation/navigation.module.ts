import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminGuardService } from '@services/admin-guard.service';
import { AuthGuradService } from '@services/auth-gurad.service';
import { AdminComponent } from './admin/admin.component';
import { EmployerComponent } from './employer/employer.component';

const routes : Routes = [
  {
    path : "admin",
    canActivate : [AdminGuardService,AuthGuradService],
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
    RouterModule.forChild(routes),
  ]
})
export class NavigationModule { }
