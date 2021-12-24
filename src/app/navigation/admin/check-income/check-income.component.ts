import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '@services/auth.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-check-income',
  templateUrl: './check-income.component.html',
  styleUrls: ['./check-income.component.scss']
})
export class CheckIncomeComponent implements OnInit {

  stat : any ;
  day : number = 0;
  month : number = 0;
  year : number = 0;


  constructor(
    private http : HttpClient,
    private _auth:AuthService) { }

  ngOnInit(): void {
    const header = this._auth.getAuthorization();
    this.http.get(`${environment.API_URL}/admin/InComeStat`,{headers:header})
      .subscribe((res : any)=>{
        this.stat = res.data ;
        this.day = Math.floor(this.stat.today*0.66);
        this.month = Math.floor(this.stat.month*0.66);
        this.year = Math.floor(this.stat.year*0.66);

        let day= setInterval(() => {
          if(this.day >= this.stat.today){
            clearInterval(day);
          }else{
            this.day ++;
          }
        }, 10);

        let month= setInterval(() => {
          if(this.month >= this.stat.month){
            clearInterval(month);  
          }else{
            this.month ++;
          }
        
        }, 10);

        let year= setInterval(() => {
          if(this.year >= this.stat.year){
            clearInterval(year);
          }else{
            this.year ++;
          }
        
        }, 10);

      },(error)=>{
        console.log(error);
      })
  }

}
