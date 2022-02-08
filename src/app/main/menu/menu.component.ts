import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { environment } from 'src/environments/environment';
import {OrderService} from '@services/order.service'

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  BACKURL = environment.BACK_URL;

  categ : any =[];
  categError : string ='';
  categorySelected : string = '';

  product : any =[];
  productError : string ='';

  giftSelected : string ;


  constructor(
    private http: HttpClient,
    private _snackBar: MatSnackBar,
    private food : OrderService
    ) {
      this.giftSelected = '' ;
    }

  ngOnInit(): void {
    this.http.get(`${environment.API_URL}/menu`)
      .subscribe((res: any) => {
        if(res.status == 'success')
          {this.categ = res.data;
          
          }
        else
          this.categError = res.description;
      });

    document.addEventListener('mouseup', this.closeMenu.bind(this));
  }

  closeMenu(e:any){
    const description = document.getElementById(this.giftSelected);
    const descriptionContent = document.getElementById("D"+this.giftSelected);
    
    if (!descriptionContent?.contains(e.target as Node)) {
      description?.classList.remove("open");
      
    }
  }


  select(id : string):void {
    document.getElementById(this.categorySelected)?.classList.remove('selected');

    this.categorySelected=id;
    setTimeout(() => {
      document.getElementById(id)?.classList.add('selected');
    }, 5);

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

  showDescription(id : string){
    
    const element = document.getElementById(id);
    console.log(element)
    if(!element?.classList.contains("open")){
      element?.classList.add("open");
      this.giftSelected = id ;
    }
  }

  addToCart(id : string,name : string , price : string){
    let quantity :number = +(<HTMLInputElement>document.getElementById("Q"+id)).value
    this.food.add(id,quantity,name,parseInt(price));
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }

}
