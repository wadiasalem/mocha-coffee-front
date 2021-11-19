import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AdminModule } from './admin/admin.module';
import { ClientModule } from './client/client.module';

const appRoutes : Routes = [
  {
    path : "admin",
    loadChildren: () =>
      import("./admin/admin.module").then((m) => m.AdminModule),
  },
  {
    path : "client",
    loadChildren: () =>
      import("./client/client.module").then((m) => m.ClientModule),
  },
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    AdminModule,
    ClientModule,
    RouterModule.forRoot(appRoutes),
  ]
})
export class NavigationModule { }
