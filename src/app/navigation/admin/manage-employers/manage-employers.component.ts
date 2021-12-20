import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AuthService } from '@services/auth.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-manage-employers',
  templateUrl: './manage-employers.component.html',
  styleUrls: ['./manage-employers.component.scss']
})
export class ManageEmployersComponent implements OnInit {

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(addEmployer, {
      width: '640px',
      data: {},
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getEmployers();
    });

  }

  getEmployers(){

  }

}



@Component({
  selector: 'addEmployer-Dialog',
  templateUrl: 'addEmployer.component.html',
  styleUrls: ['./manage-employers.component.scss']
})
export class addEmployer implements OnInit {

  EmployerForm : FormGroup ;

  constructor(
    public dialogRef: MatDialogRef<addEmployer>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuiled : FormBuilder,
    private http : HttpClient,
    private _auth : AuthService,
  ) {}


  ngOnInit(): void {
    this.EmployerForm = this.formBuiled.group({
      user_name : ['',Validators.required],
      email : ['',[Validators.required,Validators.email]],
      password : ['',Validators.required],
      category : ['',Validators.required],
      name : ['',Validators.required],
      phone : ['',[Validators.required,,Validators.pattern("[0-9]{8}$")]],
      cin : ['',[Validators.required,,Validators.pattern("[0-9]{8}$")]],
    });
  }

  addEmployer(){
    
    const header = this._auth.getAuthorization();
    this.http.post(
      `${environment.API_URL}/admin/create-employer`,
      this.EmployerForm.value,
      {headers : header})
    .subscribe((result : any)=>{
      Swal.fire({
        title: "Employer created",
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