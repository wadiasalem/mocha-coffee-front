import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { environment } from 'src/environments/environment';
import { CartService } from '@services/cart.service';
import { Sort } from '@services/sort.service';

interface sort{
  name : string,
  sort_by : string,
  value : string
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

  giftSelected : string ;

  constructor(
    private http: HttpClient,
    private _formBuilder:FormBuilder,
    private sort : Sort,
    private cart : CartService,
    private _snackBar: MatSnackBar
    ) {
      this.giftSelected = '' ;
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
    const description = document.getElementById(this.giftSelected);
    const descriptionContent = document.getElementById("D"+this.giftSelected);
    
    if (!descriptionContent?.contains(e.target as Node)) {
      description?.classList.remove("open");
      
    }
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

    this.http.get(`${environment.API_URL}/gifts/filter`,
    {
      params : {
        name : this.SearchForm.get('search')?.value,
        min : this.filterForm.get('min')?.value,
        max : this.filterForm.get('max')?.value,
        sort : sort.sort_by,
        by : sort.value
      }
    })
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
      this.giftSelected = id ;
    }
  }

  addToCart(id : string,name : string , price : string){
    let quantity :number = +(<HTMLInputElement>document.getElementById("Q"+id)).value
    this.cart.add(id,quantity,name,parseInt(price));
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }


}
