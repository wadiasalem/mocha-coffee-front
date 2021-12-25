import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AuthService } from '@services/auth.service';
import { OrderService } from '@services/order.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {

  isconnected : boolean = false ;


  food : {
    items : Array<any>,
    length : number,
    total : number
  };

  constructor(
    private auth : AuthService,
    private _food : OrderService,
    public dialog: MatDialog) { 
    this.food = {items:[],length :0,total:0};
  }

  ngOnInit(): void {
    this.auth.isConnected().subscribe((value)=>{
      this.isconnected = value;
    });
    this._food.getAll().subscribe((food)=>{
      this.food = food;
    })
  }

  logout(): void {
    const dialogRef = this.dialog.open(logoutDialog, {
      width: '300px',
      data: {},
    });
  }

  buy(): void {
    if(this.food.length != 0){
      const dialogRef = this.dialog.open(foodDialog, {
        width: '500px',
        data: {},
      });
    }
    
  }

}

@Component({
  selector: 'logout-Dialog',
  templateUrl: 'logout.component.html',
  styleUrls: ['./table.component.scss']
})
export class logoutDialog implements OnInit {

  logoutForm : FormGroup ;

  constructor(
    public dialogRef: MatDialogRef<logoutDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuiled : FormBuilder,
    private http : HttpClient,
    private _auth : AuthService,
  ) {}


  ngOnInit(): void {
    this.logoutForm = this.formBuiled.group({
      password : ['',Validators.required],
    });
  }

  logout(){
    const header = this._auth.getAuthorization();
    this.http.post(
      `${environment.API_URL}/table/logout`,
      this.logoutForm.value,
      {headers : header})
    .subscribe((result : any)=>{
      this._auth.logout();
      this.dialogRef.close();
    },((error)=>{
      Swal.fire({
        title: "Erreur!",
        text: error.error.description,
        icon: "error",
      })

    }))  

  }
}


@Component({
  selector: 'food-Dialog',
  templateUrl: 'food.component.html',
  styleUrls: ['./table.component.scss']
})
export class foodDialog implements OnInit {


  order : any;
  client : FormGroup ;

  constructor(
    public dialogRef: MatDialogRef<foodDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private http : HttpClient,
    private _auth : AuthService,
    private _order : OrderService,
    private formBuimder : FormBuilder
  ) {}


  ngOnInit(): void {
    this.client = this.formBuimder.group({
      email : ''
    });
    this._order.getAll().subscribe((data)=>{
      this.order = data ;
    })
  }

  buy(){
    const header = this._auth.getAuthorization();
    this.http.post(
      `${environment.API_URL}/table/buy`,
      {
        order : this.order,
        client : this.client.value
      },
      {headers : header})
    .subscribe((result : any)=>{
      Swal.fire({
        timer: 1000,
        title: "Successfuly!",
        icon: "success",
      })
      this._order.clearfood();
      this.dialogRef.close();
    },((error)=>{
      console.log(error);
      Swal.fire({
        title: "Erreur!",
        icon: "error",
      })

    }))  

  }

  clear(){
    this._order.clearfood();
    this.dialogRef.close();
  }

  remove(id : string){
    this.order.length -= this.order.items[id].quantity ;
    if(this.order.length<0){
      this.order.length = 0 ;
    }
    this.order.total -= this.order.items[id].quantity * this.order.items[id].price ;
    if(this.order.total<0){
      this.order.total = 0 ;
    }
    this.order.items[id] = null ;
    this._order.update(this.order);

    if(this.order.length == 0){
      this.dialogRef.close();
    }
  }
}