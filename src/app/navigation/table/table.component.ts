import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { OrderService } from '@services/order.service';
import { PusherService } from '@services/pusher.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {

  toDay : any;
  datepipe : DatePipe = new DatePipe('en-US');

  element : Array<HTMLElement | null> = [];

  table_number : string | null;
  categ : any =[];
  categError : string ='';
  product : any =[];
  productError : string ='';

  constructor(
    private http: HttpClient,
    private food : OrderService) { 
    this.table_number = localStorage.getItem('table_number');
  }

  ngOnInit(): void {
    setInterval(() => {
      this.toDay = this.datepipe.transform(new Date(), 'dd-MM-YYYY HH:mm:ss') ;
    }, 1);

    this.http.get(`${environment.API_URL}/menu`)
      .subscribe((res: any) => {
        if(res.status == 'success')
          {this.categ = res.data;
          
          }
        else
          this.categError = res.description;
      });
    
  }

  select(id : string){
    this.http.get(`${environment.API_URL}/menu/product?id=${id}`)
      .subscribe((res: any) => {
        if(res.status == 'success')
          {this.product = res.data;
          this.productError = '' ;
          }
        else
          this.productError = res.description;
      });
  }

  back(){
    this.product = [];
    this.productError = '' ;
  }

  showDescription(id:string){
    if(this.element[1] && this.element[0])
      {
        this.element[1].style.display = 'none';
        this.element[0].style.display = 'none';
        this.element[1] = null ;
        this.element[0] = null ;
      }
    
    if(this.element[1]!=document.getElementById("D"+id)){
      if (this.element[1] && this.element[2]) {
        this.element[1].style.display = 'none';
        this.element[2].style.display = 'none';
      }
  
      this.element[1] = document.getElementById("D"+id);
      this.element[0] = document.getElementById("P"+id);
      if (this.element[1] && this.element[0]) {
        this.element[1].style.display = 'block';
        this.element[0].style.display = 'block';
        this.element[1].scrollIntoView({behavior: "smooth", block: "center"});
      }
    }
  }

  close(){
    if(this.element[1] && this.element[0])
      {
        this.element[1].style.display = 'none';
        this.element[0].style.display = 'none';
      }
    this.element[1] = null ;
    this.element[0] = null ;
  }

  addToCart(id : string,name : string , price : string){
    let quantity :number = +(<HTMLInputElement>document.getElementById("Q"+id)).value
    this.food.add(id,quantity,name,parseInt(price));
    this.close();
  }

}
