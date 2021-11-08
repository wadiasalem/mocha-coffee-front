import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {MatButtonModule} from '@angular/material/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { MainModule } from './main/main.module';
import { FooterComponent } from './layout/footer/footer.component';
import { HeaderModule } from './layout/header/header.module';


const appRoutes: Routes = [
  {
    path : "",
    loadChildren: () =>
      import("./main/main.module").then((m) => m.MainModule),
  },
  {
    path : "errors",
    loadChildren: () =>
      import("./navigation/errors/errors.module").then((m) => m.ErrorsModule),
  },
  {
    path : "admin",
    loadChildren: () =>
      import("./navigation/admin/admin.module").then((m) => m.AdminModule),
  },
  {
    path : "client",
    loadChildren: () =>
      import("./navigation/client/client.module").then((m) => m.ClientModule),
  },
  {
    path: "**",
    redirectTo: "errors/error-404",
  },
];

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent
  ],
  imports: [
    MainModule,
    MatButtonModule,
    BrowserModule,
    HeaderModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(appRoutes),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
