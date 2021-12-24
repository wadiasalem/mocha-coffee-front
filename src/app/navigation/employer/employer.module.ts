import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployerComponent } from './employer.component';
import { CheckCommandsComponent } from './check-commands/check-commands.component';
import { RouterModule, Routes } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { CheckReservationsComponent } from './check-reservations/check-reservations.component';

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
  ]
})
export class EmployerModule { }
