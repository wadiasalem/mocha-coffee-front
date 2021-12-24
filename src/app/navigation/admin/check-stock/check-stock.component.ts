import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '@services/auth.service';
import { environment } from 'src/environments/environment';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-check-stock',
  templateUrl: './check-stock.component.html',
  styleUrls: ['./check-stock.component.scss']
})
export class CheckStockComponent implements OnInit , AfterViewInit{

  displayedColumns: string[] = ['id', 'name', 'description', 'price','quantity'];
  displayedColumns2: string[] = ['id', 'name', 'price','quantity'];
  gifts : Array<any> ;
  products : Array<any> ;

  dataSource: MatTableDataSource<any>;
  dataSource2: MatTableDataSource<any>;

  @ViewChild("MatPaginator") paginator: MatPaginator;
  @ViewChild("MatSort") sort: MatSort;

  @ViewChild("MatPaginator2") paginator2: MatPaginator;
  @ViewChild("MatSort2") sort2: MatSort;

  constructor(
    private http : HttpClient,
    private _auth :AuthService
  ) {
    this.gifts = [];
    this.products = [];
    this.dataSource = new MatTableDataSource(this.gifts);
    this.dataSource2 = new MatTableDataSource(this.products);
  }
  ngAfterViewInit(): void {
    
  }

  ngOnInit(): void {
    const header = this._auth.getAuthorization();
    this.http.get(`${environment.API_URL}/admin/get-gift-stock`,{headers : header})
      .subscribe((data : any)=>{
        this.gifts = data.data ;
        this.dataSource = new MatTableDataSource(this.gifts);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },(error)=>{

      });

    this.http.get(`${environment.API_URL}/admin/get-product-stock`,{headers : header})
      .subscribe((data : any)=>{
        this.products = data.products ;
        this.dataSource2 = new MatTableDataSource(this.products);
        this.dataSource2.paginator = this.paginator2;
        this.dataSource2.sort = this.sort2;
      },(error)=>{
        
      });
  }

updateProduct(id : string,value : string,toDo : string){
  const header = this._auth.getAuthorization();
  this.http.patch(`${environment.API_URL}/admin/update-product`,
  {id : id,value : value , toDo : toDo},
  {headers:header}).subscribe((result : any)=>{
    Swal.fire({
      title : "Done",
      text : result.description,
      icon : "success"
    })
  },(error : any)=>{
    Swal.fire({
      title : "Error!",
      text : error.description,
      icon : "error"
    })
  })
}

updateGift(id : string,value : string,toDo : string){
  const header = this._auth.getAuthorization();
  this.http.patch(`${environment.API_URL}/admin/update-gift`,
  {id : id,value : value , toDo : toDo},
  {headers:header}).subscribe((result : any)=>{
    Swal.fire({
      title : "Done",
      text : result.description,
      icon : "success"
    })
  },(error : any)=>{
    Swal.fire({
      title : "Error!",
      text : error.description,
      icon : "error"
    })
  })
}

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  applyFilter2(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource2.filter = filterValue.trim().toLowerCase();

    if (this.dataSource2.paginator) {
      this.dataSource2.paginator.firstPage();
    }
  }

}
