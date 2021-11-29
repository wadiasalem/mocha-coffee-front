import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { AuthService } from '@services/auth.service';
import { environment } from 'src/environments/environment';
import Swal  from 'sweetalert2';

@Component({
  selector: 'app-general-settings',
  templateUrl: './general-settings.component.html',
  styleUrls: ['./general-settings.component.scss']
})
export class GeneralSettingsComponent implements OnInit {

  @ViewChild('PersonalformDirective') private PersonalformDirective: NgForm;
  @ViewChild('SecurityformDirective') private SecurityformDirective: NgForm;

  personalForm : FormGroup;
  SecurityForm : FormGroup;

  hideOldPassword : boolean = true;
  hideNewPassword : boolean = true;
  hideConfirmPassword : boolean = true;


  constructor(
    private _formBuilder : FormBuilder,
    private http : HttpClient,
    private auth : AuthService
    ) { }

  ngOnInit(): void {
    this.personalForm = this._formBuilder.group({
      name: ['', Validators.required],
      number: ['', [Validators.maxLength(8),Validators.minLength(8)]],
      address : ['', [Validators.maxLength(255)]],
      password : ['', [Validators.required]],
    });

    this.SecurityForm = this._formBuilder.group({
      oldPassword:['', Validators.required],
      newPassword:['', Validators.required],
      confirmPassword:['', Validators.required],
    }, {
      validator: MustMatch('newPassword','confirmPassword')
    });

    this.personalForm.setValue({
      name:localStorage.getItem('name'),
      number:localStorage.getItem('number'),
      address:localStorage.getItem('address'),
      password : ''
    })
  }

  updatePersonal(){
    let header = this.auth.getAuthorization();
    this.http.post(
      `${environment.API_URL}/account/personal-update`,
      this.personalForm.value,
      {headers:header}).subscribe((data:any)=>{
        Swal.fire({
          title: data.description,
          icon: "success",
        });
        localStorage.setItem('name',this.personalForm.controls['name'].value)
        localStorage.setItem('number',this.personalForm.controls['number'].value)
        localStorage.setItem('address',this.personalForm.controls['address'].value)
        this.personalForm.controls['password'].reset();
        this.PersonalformDirective.resetForm(this.personalForm.value);
    },((error)=>{
      Swal.fire({
          title: "Erreur!",
          text: error.error.description,
          icon: "error",
        });
      
    }))
  }

  updateSecurity(){
    let header = this.auth.getAuthorization();
    this.http.post(
      `${environment.API_URL}/account/password-update`,
      this.SecurityForm.value,
      {headers:header}).subscribe((data:any)=>{
        Swal.fire({
          title: data.description,
          icon: "success",
        });

        this.SecurityForm.reset();
        this.SecurityformDirective.resetForm();
    },((error)=>{
      Swal.fire({
          title: "Erreur!",
          text: error.error.description,
          icon: "error",
        });
      
    }))
  }

}

export function MustMatch(controlName: string, matchingControlName: string) {
  return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];

      if (matchingControl.errors && !matchingControl.errors.mustMatch) {
          // return if another validator has already found an error on the matchingControl
          return;
      }

      // set error on matchingControl if validation fails
      if (control.value !== matchingControl.value) {
          matchingControl.setErrors({ mustMatch: true });
      } else {
          matchingControl.setErrors(null);
      }
  }
}