import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  categ : any =[];
  categError : string ='';
  categSelected : string = '';

  product : any =[];
  productError : string ='';

  categorySelected : boolean = false;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get(`${environment.API_URL}/menu`)
      .subscribe((res: any) => {
        if(res.status == 'success')
          {this.categ = res.data;
          
          }
        else
          this.categError = res.description;
      });
  }

  select($id : string):void {
    this.categorySelected = true; 
    document.getElementById(this.categSelected)?.classList.remove('selected');

    this.categSelected=$id;
    document.getElementById($id)?.classList.add('selected');

    this.http.get(`${environment.API_URL}/menu/product?id=${$id}`)
      .subscribe((res: any) => {
        if(res.status == 'success')
          {this.product = res.data;
          this.productError = '' ;
          }
        else
          this.productError = res.description;
      });
  }

}
