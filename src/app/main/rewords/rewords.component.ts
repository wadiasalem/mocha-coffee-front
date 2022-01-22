import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '@services/auth.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-rewords',
  templateUrl: './rewords.component.html',
  styleUrls: ['./rewords.component.scss']
})
export class RewordsComponent implements OnInit {

  BACKURL : string;

  rewords : Array<any> ;
  constructor(
    private http : HttpClient,
    private _auth : AuthService) {
      this.BACKURL = environment.BACK_URL.slice(0, -1)
    }

  ngOnInit(): void {
    
    const header  = this._auth.getAuthorization();
    this.http.get(`${environment.API_URL}/rewords`,{headers:header})
      .subscribe((result:any)=>{
        this.rewords = result.rewords
        console.log(this.rewords)
      },(error)=>{
        this.rewords = [];
      })
  }

}
