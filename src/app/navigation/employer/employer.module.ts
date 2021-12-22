import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployerComponent } from './employer.component';
import { CheckCommandsComponent } from './check-commands/check-commands.component';
import { RouterModule, Routes } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

const routes : Routes = [
  {
    path : "commands",
    component : CheckCommandsComponent,
  },
  
    
];

@NgModule({
  declarations: [
    EmployerComponent,
    CheckCommandsComponent
  ],
  imports: [
    MatIconModule,
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class EmployerModule { }
