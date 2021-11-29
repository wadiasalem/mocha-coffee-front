import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
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

  element : Array<HTMLElement | null> = [];


  constructor(private http: HttpClient,private _snackBar: MatSnackBar) {}

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
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }

}
