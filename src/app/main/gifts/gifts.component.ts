import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { environment } from 'src/environments/environment';
import { CartService } from '@services/cart.service';
import { Sort } from '@services/sort.service';

interface sort{
  name : String,
  sort_by : String,
  value : String
}

@Component({
  selector: 'app-gifts',
  templateUrl: './gifts.component.html',
  styleUrls: ['./gifts.component.scss']
})
export class GiftsComponent implements OnInit {

  filterForm : FormGroup ;
  SearchForm : FormGroup ;

  gifts : any =[];
  giftsError : string ='';

  layout : string = 'grid';
  sortList : Array<sort> ;
  sortSelected : sort;

  element : Array<HTMLElement | null> = [];

  constructor(
    private http: HttpClient,
    private _formBuilder:FormBuilder,
    private sort : Sort,
    private cart : CartService,
    private _snackBar: MatSnackBar
    ) {
      
    }

  ngOnInit(): void {
    this.sortList = this.sort.getSort();
    this.SearchForm = this._formBuilder.group({
      search   : ['']
    });
    this.filterForm = this._formBuilder.group({
      min   : [''],
      max   : ['']
    });

    this.filterForm.setValue({
      min : "0",
      max : "100"
    });

    this.http.get(`${environment.API_URL}/gifts`)
      .subscribe((res: any) => {
        if(res.status == 'success')
          {this.gifts = res.data;
            this.giftsError = "";
          }
        else
        { this.gifts = [];
          this.giftsError = res.description;
        }
      });
  }

  viewChange(value : string){
    this.layout = value;
  }

  filter(){
    let sort;

    if(this.sortSelected)
      sort = this.sortSelected;
    else
      sort = {
        sort_by:'id',
        value : 'asc'
      };

    let name = this.SearchForm.get('search')?.value;
    let min = this.filterForm.get('min')?.value;
    let max = this.filterForm.get('max')?.value;

    this.http.get(`${environment.API_URL}/gifts/filter?name=${name}&min=${min}&max=${max}&sort=${sort.sort_by}&by=${sort.value}`)
      .subscribe((res: any) => {
        if(res.status == 'success')
          {this.gifts = res.data;
            this.giftsError = "";
          
          }
        else
        { this.gifts = [];
          this.giftsError = res.description;
        }
          
      });
  }

  reset(){
    this.filterForm.setValue({
      min : "0",
      max : "100"
    });
    this.SearchForm.setValue({
      search : ""
    });
    this.sortSelected ={
      name : '-Select-',
    sort_by :'id',
    value : 'asc'
    }
    
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
    this.cart.add(id,quantity,name,parseInt(price));
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }


}
