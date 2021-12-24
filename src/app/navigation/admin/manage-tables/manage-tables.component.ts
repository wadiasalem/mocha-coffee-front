import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '@services/auth.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-manage-tables',
  templateUrl: './manage-tables.component.html',
  styleUrls: ['./manage-tables.component.scss']
})
export class ManageTablesComponent implements OnInit {

  tables : Array<any> ;
  tableError : string ;
  tableInformations : any ;
  

  constructor(
    private http : HttpClient,
    private _auth : AuthService,
    public dialog: MatDialog
    ) { }

  ngOnInit(): void {

    this.getTables();

  }


  getTables(){
    const header = this._auth.getAuthorization();

    this.http.get(`${environment.API_URL}/admin/get-tables`,{headers : header})
    .subscribe((result : any)=>{
      this.tables = result.tables ;
      this.tables.sort((a, b) => a.table_number - b.table_number)
    },((error : any)=>{
      this.tableError = error.description ;
    }))
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(updateDialog, {
      width: '300px',
      data: {},
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getTables();
    });

  }

  information(number : number){
    let header = this._auth.getAuthorization();

    this.http.get(`${environment.API_URL}/admin/get-table-info`,{headers : header,params:{table_number:number}})
    .subscribe((result : any)=>{
      this.tableInformations = result ;
    },((error : any)=>{
      console.log(error)
    }))
  }

}


@Component({
  selector: 'update-Dialog',
  templateUrl: 'update-Dialog.html',
  styleUrls: ['./manage-tables.component.scss']
})
export class updateDialog implements OnInit {

  TableForm : FormGroup ;

  constructor(
    public dialogRef: MatDialogRef<updateDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuiled : FormBuilder,
    private http : HttpClient,
    private _auth : AuthService,
  ) {}


  ngOnInit(): void {
    this.TableForm = this.formBuiled.group({
      user_name : ['',Validators.required],
      email : ['',Validators.required],
      password : ['',Validators.required],
      table_number : ['',Validators.required],
    });
  }

  addTable(){
    
    const header = this._auth.getAuthorization();
    this.http.post(
      `${environment.API_URL}/admin/create-table`,
      this.TableForm.value,
      {headers : header})
    .subscribe((result : any)=>{
      Swal.fire({
        title: "Table created",
        icon: "success",
      })
      this.dialogRef.close();

    },((error)=>{
      Swal.fire({
        title: "Erreur!",
        text: error.error.discription,
        icon: "error",
      })

    }))  

  }
}