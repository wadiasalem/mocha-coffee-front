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


const appRoutes: Routes = [
  { 
    path: "", 
    redirectTo : "app/home",
    pathMatch : "full"
  },
  {
    path : "app",
    loadChildren: () =>
      import("./main/main.module").then((m) => m.MainModule),
    },
  {
    path: "mocha",
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
    NavigationModule,
    ErrorsModule,
    TemplateModule,
    MainModule,
    MatButtonModule,
    LayoutModule,
    
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(appRoutes),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
