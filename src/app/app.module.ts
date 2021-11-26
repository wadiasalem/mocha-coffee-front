import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {MatButtonModule} from '@angular/material/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { MainModule } from './main/main.module';
import { TemplateModule } from './template/template.module';
import { Error404Component } from './errors/error404/error404.component';
import { NavigationModule } from './navigation/navigation.module';
import { ErrorsModule } from './errors/errors.module';
import { LayoutModule } from './layout/layout.module';


const appRoutes: Routes = [
  {
    path : "",
    loadChildren: () =>
      import("./main/main.module").then((m) => m.MainModule),
  },
  {
    path: "profil",
    loadChildren: () =>
      import("./navigation/navigation.module").then((m) => m.NavigationModule),
  },
  {
    path : "**",
    redirectTo : "error/404"
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
    NavigationModule,
    ErrorsModule,
    TemplateModule,
    MainModule,
    TemplateModule,
    MatButtonModule,
    BrowserModule,
    LayoutModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(appRoutes),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
