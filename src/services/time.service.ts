import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TimeService {
  
month = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

days = [
  'Sun',
  'Mon',
  'Tue',
  'Wed',
  'Thu',
  'Fri',
  'Sat'
];

hour : Array<string> = [];

minute : Array<string> = [] ;

  constructor() {
    for (let index = 0; index < 60; index+=15) {
      if(index<10)
        this.minute.push('0'+index.toString());
      else
        this.minute.push(index.toString());
    }

    for (let index = 10; index < 22; index++) {
        this.hour.push(index.toString());
    }

  }
}
