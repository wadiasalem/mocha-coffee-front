import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployerComponent } from './employer.component';
import { CheckCommandsComponent } from './check-commands/check-commands.component';
import { RouterModule, Routes } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { CheckReservationsComponent } from './check-reservations/check-reservations.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { authInterceptor } from 'src/app/errors/error401/interceptor401';

const routes : Routes = [
  {
    path : "commands",
    component : CheckCommandsComponent,
  },
  {
    path : "reservations",
    component : CheckReservationsComponent,
  },
  
];

@NgModule({
  declarations: [
    EmployerComponent,
    CheckCommandsComponent,
    CheckReservationsComponent
  ],
  imports: [
    MatIconModule,
    CommonModule,
    RouterModule.forChild(routes)
  ],
  providers : [
    { 
      provide: HTTP_INTERCEPTORS,
      useClass: authInterceptor, 
      multi: true 
    }
  ]
})
export class EmployerModule { }
