import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {MatButtonModule} from '@angular/material/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { MainModule } from './main/main.module';
import { FooterComponent } from './layout/footer/footer.component';
import { HeaderModule } from './layout/header/header.module';
import { TemplateModule } from './template/template.module';
import { Error404Component } from './errors/error404/error404.component';
import { NavigationModule } from './navigation/navigation.module';
import { ErrorsModule } from './errors/errors.module';


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
    component : Error404Component
  },
];

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
  ],
  imports: [
    NavigationModule,
    ErrorsModule,
    TemplateModule,
    MainModule,
    TemplateModule,
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
