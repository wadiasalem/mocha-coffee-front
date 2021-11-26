import { Component, OnInit } from '@angular/core';
import { AuthGuradService } from '../auth/auth-gurad.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  isConnected : boolean ;

  constructor(private authGuard : AuthGuradService) { }

  ngOnInit(): void {
    this.isConnected = this.authGuard.isConnected([]);
    console.log(this.isConnected)
  }

}
