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

  BACKURL = environment.BACK_URL;

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

      document.addEventListener('mouseup', this.closeMenu.bind(this));
  }

  closeMenu(e:any){
    const description = document.getElementsByClassName("description-content");
    const accountMenuContent = document.getElementById("accountMenuContent");
    
    
    // if (!description?.contains(e.target as Node)) {
    //     mainMenu?.classList.remove("open");
      
    // }
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

  showDescription(id : string){
    const element = document.getElementById(id);
    if(!element?.classList.contains("open")){
      element?.classList.add("open");
    }else{
      element?.classList.remove("open");
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
