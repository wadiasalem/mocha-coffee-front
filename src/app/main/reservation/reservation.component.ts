import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TimeService } from '@services/time.service';
import { HotModuleReplacementPlugin } from 'webpack';



@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.scss']
})
export class ReservationComponent implements OnInit {

  @ViewChild('selectedDate') selectedDate : ElementRef ;

  month : Array<string> ; 
  day : Array<string> ; 
  hour:Array<string> ;
  minute:Array<string> ;

  selected : HTMLElement | null ;

  Reservation: FormGroup ;

  dates : Array<Date> = [];

  groundFlour : boolean = true;
  flourTitle: "Ground Floor" | "First Floor" = "Ground Floor";

  constructor(private formBuilder : FormBuilder ,private time : TimeService ) { }

  ngOnInit(): void {
    
    let today = new Date();

    this.minute = this.time.minute;
    this.month  = this.time.month;
    this.day  = this.time.days; 
    this.hour = this.time.hour;

    
    for (let index = 0; index < 5; index++) {
      this.dates.push(new Date(new Date().setDate(today.getDate()+ index )));
    }

    window.addEventListener('DOMContentLoaded',()=>{
      this.select(this.dates[0]);
    })

    this.Reservation = this.formBuilder.group({
      date: [today,Validators.required],
      hour : ['',Validators.required],
      minute :['' ,Validators.required],
      normal: ['',Validators.required],
      child : ['',Validators.required],
      table: ['',Validators.required]
    });

  }

  myFilter = (d: Date | null): boolean => {
    const day = (d || new Date());
    // Prevent Saturday and Sunday from being selected.
    return day > new Date(new Date().setDate(new Date().getDate()-1 ));
  };

  select(date : Date){
    this.Reservation.patchValue({
      date:date,
    })
    if(this.selected != document.getElementById(date.getDate().toString())){
      this.Reservation.reset();
      this.selected?.classList.remove('day-item-selected');
      this.selected = document.getElementById(date.getDate().toString());
      this.selected?.classList.add('day-item-selected');
    }
  }

  change(){
    let date = this.Reservation.controls['date'].value;
    this.select(date);
  }

  stair(){
    this.groundFlour = !this.groundFlour;
    let flour = document.getElementById('flour');

    let ground = document.getElementById('ground');
    let first = document.getElementById('ferst');

    let stair = document.getElementById('stair');
    if(!this.groundFlour){
      setTimeout(() => {
        this.flourTitle = "First Floor"
        ground?.classList.remove('img-selected');
        first?.classList.add('img-selected');
      }, 1000);
      
      stair?.classList.remove('down');
      stair?.classList.add('up');
    }else{
      setTimeout(() => {
        this.flourTitle = "Ground Floor"
        ground?.classList.add('img-selected');
        first?.classList.remove('img-selected');
      }, 1000);
      stair?.classList.remove('up');
      stair?.classList.add('down');
    }

    flour?.classList.remove('selected');
    setTimeout(() => {
      flour?.classList.add('selected');
    }, 10);
    

  }

}
