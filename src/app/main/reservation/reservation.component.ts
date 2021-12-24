import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { AuthService } from '@services/auth.service';
import { TimeService } from '@services/time.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';



@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.scss']
})
export class ReservationComponent implements OnInit {

  @ViewChild('selectedDate') selectedDate : ElementRef ;
  @ViewChild('normal') normal : ElementRef ;
  @ViewChild('child') child : ElementRef ;
  @ViewChild('form') private form: NgForm;

  month : Array<string> ; 
  day : Array<string> ; 
  hour:Array<string> ;
  minute:Array<string> ;

  selected : HTMLElement | null ;

  Reservation: FormGroup ;

  dates : Array<Date> = [];
  today : Date;

  tables : any ;
  Reservations : Array<number> = [];
  selectedTable :  Array<number> = [];

  constructor(
    private formBuilder : FormBuilder ,
    private time : TimeService ,
    private http : HttpClient ,
    private _auth : AuthService
    ) { }

  ngOnInit(): void {
    const header = this._auth.getAuthorization() ;

    this.http.get(`${environment.API_URL}/client/tables`,{headers:header}).subscribe((result)=>{
      this.tables = result ;
    })
    
    this.today = new Date()
    

    this.minute = this.time.minute;
    this.month  = this.time.month;
    this.day  = this.time.days; 
    this.hour = this.time.LastHours;
    if(this.today.getHours() > 21){
      this.today = new Date(new Date().setDate(this.today.getDate()+ 1 ));
    }

    
    for (let index = 0; index < 5; index++) {
      this.dates.push(new Date(new Date().setDate(this.today.getDate()+ index )));
    }

    window.addEventListener('load',()=>{
      this.select(this.dates[0]);
    });

    this.Reservation = this.formBuilder.group({
      date: new FormControl(this.today,Validators.required),
      hour : ['',Validators.required],
      minute :['',Validators.required],
      normal: ['',Validators.required],
      child : ['',Validators.required],
      table: ['',Validators.required]
    });

    this.Reservation.patchValue({
      date : this.today,
      child : 0,
      normal : 1
    });
    
  }

  myFilter = (d: Date | null): boolean => {
    const day = (d || new Date());
    
    return day > new Date(new Date().setDate(new Date().getDate()-1 ));
  };

  select(date : Date){
    if(this.selected != document.getElementById(date.getDate().toString())){

      if(date.getDate() == this.today.getDate())
        this.hour = this.time.LastHours;
      else
        this.hour = this.time.hour;

      this.Reservation.reset();
      this.Reservation.patchValue({
        date:date,
        child : 0,
        normal : 1
      })
      this.selected?.classList.remove('day-item-selected');
      this.selected = document.getElementById(date.getDate().toString());
      this.selected?.classList.add('day-item-selected');
    }
    
  }

  change(){
    let date = this.Reservation.controls['date'].value;
    this.select(date);
  }


  getReservations(){
    if(this.Reservation.controls['hour'].value && 
    this.Reservation.controls['minute'].value){
      let d = new Date(this.Reservation.controls['date'].value);
      
      const dateTime = 
      d.getFullYear()+"-"+(d.getMonth()+1)+"-"+d.getDate()+" "+
      this.Reservation.controls['hour'].value+":"+
      this.Reservation.controls['minute'].value+":00" ;

      const header = this._auth.getAuthorization() ;

      this.http.get(
        `${environment.API_URL}/client/reservations`,
        {headers:header,
          params:{
            date : dateTime
          }}
        ).subscribe((result:any)=>{
        this.Reservations = result.reservations ;
      },(error)=>{
        console.log(error);
      })
    }
    
  }

  selectTable(id : any){
      this.selectedTable.push(id as number);
      this.Reservation.patchValue({
        table : this.selectedTable,
      });
  }

  removeTable(id : any){
    this.selectedTable.splice(this.selectedTable.indexOf(id),1);
    this.Reservation.patchValue({
      table : this.selectedTable,
    });
  }

  reserve(){
    let d = new Date(this.Reservation.controls['date'].value);
      
    const dateTime = 
    d.getFullYear()+"-"+(d.getMonth()+1)+"-"+d.getDate()+" "+
    this.Reservation.controls['hour'].value+":"+
    this.Reservation.controls['minute'].value+":00" ;

    this.Reservation.patchValue({
      date : dateTime,
      normal : this.normal.nativeElement.value,
      child : this.child.nativeElement.value,
    });


    const header = this._auth.getAuthorization();
    this.http.post(`${environment.API_URL}/client/reserve`
    ,this.Reservation.value,
    {headers:header}).subscribe((result : any )=>{
      let date = this.Reservation.controls['date'].value;
      this.form.resetForm({
        date:new Date(date),
        child : 0,
        normal : 1
      });
      this.selectedTable = [] ;
      Swal.fire({
        title : 'Success',
        text: result.discription,
        icon: "success",
      })
    },(error)=>{
      Swal.fire({
        title : 'Error !',
        text: 'Internel Error',
        icon: "error",
      })
    })

    
  }
}
