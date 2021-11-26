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
  categorySelected : string = '';

  product : any =[];
  productError : string ='';


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
    document.getElementById(this.categorySelected)?.classList.remove('selected');

    this.categorySelected=$id;
    setTimeout(() => {
      document.getElementById($id)?.classList.add('selected');
    }, 5);

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
