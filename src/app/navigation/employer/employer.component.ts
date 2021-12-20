import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-employer',
  templateUrl: './employer.component.html',
  styleUrls: ['./employer.component.scss']
})
export class EmployerComponent implements OnInit {

  
  toDay : any;
  datepipe : DatePipe = new DatePipe('en-US');
  name : string | null = "";

  constructor() { }

  ngOnInit(): void {
    setInterval(() => {
      this.toDay = this.datepipe.transform(new Date(), 'dd-MM-YYYY HH:mm:ss') ;
    }, 1);

    this.name = localStorage.getItem('name');
  }

}
