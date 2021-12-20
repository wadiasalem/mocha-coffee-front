import { Component} from '@angular/core';
import { AuthService } from '@services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent  {

  role : string | null = null;

  constructor(private _auth : AuthService){

    this._auth.isConnected().subscribe((data)=>{
      if(data){
        switch (localStorage.getItem('role')) {
          case '1': this.role = 'admin';break;
          case '2': this.role = 'client';break;
          case '3': this.role = 'table';break;
          case '4': this.role = 'employer';break;
        }
      }else{
        this.role = null ;
      }
    })
    
  }

}
