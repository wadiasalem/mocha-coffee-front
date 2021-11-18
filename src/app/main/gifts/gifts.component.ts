import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';

interface Sort{
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
  sort : Array<Sort>= [
    {
      name : '-Select-',
    sort_by :'id',
    value : 'asc'
    },
    { name : 'Name, A to Z',
    sort_by :'name',
    value : 'asc'},

    { name : 'Name, Z to A',
    sort_by :'name',
    value : 'desc'},

    { name : 'Ascending Price',
    sort_by :'price',
    value : 'asc'},

    { name : 'Descending Price',
    sort_by :'price',
    value : 'desc'}
    
  ];

  sortSelected : Sort;
  itemIdSelected :string ;

  constructor(private http: HttpClient,private _formBuilder:FormBuilder) {}

  ngOnInit(): void {
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
    
    let element = document.getElementById(this.itemIdSelected);
    console.log(element);
    if (element) {
      element.style.display = 'none';
    }
    
    element = document.getElementById(id);
    console.log(element);
    if (element) {
    element.style.display = 'block';
    }
    this.itemIdSelected = id ;
  }

}
