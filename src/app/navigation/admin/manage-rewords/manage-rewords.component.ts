import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AuthService } from '@services/auth.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-manage-rewords',
  templateUrl: './manage-rewords.component.html',
  styleUrls: ['./manage-rewords.component.scss']
})
export class ManageRewordsComponent implements OnInit {

  displayedColumns2: string[] = ['id', 'name', 'description','points','from','to'];
  rewords : Array<any> ;
  dataSource2: MatTableDataSource<any>;
  @ViewChild("MatPaginator2") paginator2: MatPaginator;
  @ViewChild("MatSort2") sort2: MatSort;

  constructor(
    public dialog: MatDialog,
    private http : HttpClient,
    private _auth : AuthService) { 
      this.rewords = [];
      this.dataSource2 = new MatTableDataSource(this.rewords);
    }

  ngOnInit(): void {
    this.getRewords();
  }

  getRewords(){
    const header  = this._auth.getAuthorization();
    this.http.get(`${environment.API_URL}/admin/getRewords`,
    {headers : header}).subscribe((result:any)=>{
        this.rewords = result.rewords ;
        this.dataSource2 = new MatTableDataSource(this.rewords);
        this.dataSource2.paginator = this.paginator2;
        this.dataSource2.sort = this.sort2;
    },(error)=>{
      console.log(error);
    })
  }

  applyFilter2(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource2.filter = filterValue.trim().toLowerCase();

    if (this.dataSource2.paginator) {
      this.dataSource2.paginator.firstPage();
    }
  }

  openDialog(){
    const dialogRef = this.dialog.open(AddRewordComponent, {
      width: '300px',
      data: {},
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getRewords();
    });

  }
}


@Component({
  selector: 'app-add-reword',
  templateUrl: './add-reword.component.html',
  styleUrls: ['./manage-rewords.component.scss']
})
export class AddRewordComponent implements OnInit {

  rewordForm : FormGroup ;
  imageData : FormData ;
  image : File ;
  constructor(
    private _formBuilder : FormBuilder,
    private http : HttpClient,
    private _auth : AuthService,
    public dialogRef: MatDialogRef<AddRewordComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  ngOnInit(): void {
    this.rewordForm = this._formBuilder.group({
      name : ['',Validators.required],
      description : ['',Validators.required],
      points : ['',Validators.required],
      start : ['',Validators.required],
      end : ['',Validators.required],
      image : ['',Validators.required],
      startSend :'',
      endSend : ''
    });
  }

  processFile(imageInput : any){
    this.image = imageInput.files[0];
    this.imageData = new FormData();
    this.imageData.append('image', this.image,this.image.name);
  }
  

  addReword(){
    const start = new Date(this.rewordForm.controls['start'].value);
    const end = new Date(this.rewordForm.controls['end'].value);
      
    const startSend = 
    start.getFullYear()+"-"+(start.getMonth()+1)+"-"+start.getDate()+"00:00:00" ;
    const endSend = 
    end.getFullYear()+"-"+(end.getMonth()+1)+"-"+end.getDate()+"23:59:59" ;

    this.rewordForm.patchValue({
      startSend : startSend,
      endSend : endSend,
    });

    const header  = this._auth.getAuthorization();
    this.http.post(`${environment.API_URL}/admin/addReword`,
      this.imageData,{headers : header,params : this.rewordForm.value}).subscribe((result)=>{
        this.dialogRef.close();
    },(error)=>{
      console.log(error);
    })
  }
}
