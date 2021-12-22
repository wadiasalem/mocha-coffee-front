import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { PusherService } from '@services/pusher.service';

@Component({
  selector: 'app-employer',
  templateUrl: './employer.component.html',
  styleUrls: ['./employer.component.scss']
})
export class EmployerComponent implements OnInit {

  
  toDay : any;
  datepipe : DatePipe = new DatePipe('en-US');
  name : string | null = "";

  constructor(private pusher : PusherService) { }

  ngOnInit(): void {
    setInterval(() => {
      this.toDay = this.datepipe.transform(new Date(), 'dd-MM-YYYY HH:mm:ss') ;
    }, 1);

    this.name = localStorage.getItem('name');

  }

}
