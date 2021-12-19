import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatButtonModule } from '@angular/material/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';

import { MainModule } from './main/main.module';
import { TemplateModule } from './template/template.module';
import { NavigationModule } from './navigation/navigation.module';
import { ErrorsModule } from './errors/errors.module';
import { LayoutModule } from './layout/layout.module';

import { AppComponent } from './app.component';
import { HomeComponent } from './main/home/home.component';
import { AuthService } from '@services/auth.service';
import { HttpClientModule } from '@angular/common/http';
import { ClientGuardService } from '@services/client-guard.service';


const appRoutes: Routes = [
  {
    path: "auth", 
    loadChildren: () =>
      import("../app/main/auth/auth.module").then(((m)=>m.AuthModule)),
  },
  //client routes
  {
    path : "",
    canActivate : [ClientGuardService],
    loadChildren: () =>
      import("./main/main.module").then((m) => m.MainModule),
  },
  //admin/table/employer routes
  {
    path: "",
      loadChildren: () =>
      import("./navigation/navigation.module").then((m) => m.NavigationModule),

  },
  {
      path : "**",
      redirectTo : "/error/404"
    
  },
  {
    path : "error",
    loadChildren: () =>
      import("./errors/errors.module").then((m) => m.ErrorsModule),
  
  }
];

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    TemplateModule,
    MatButtonModule,
    LayoutModule,
    
    HttpClientModule,
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(appRoutes),
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
