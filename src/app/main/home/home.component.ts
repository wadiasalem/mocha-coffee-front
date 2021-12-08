import { Component, OnInit } from '@angular/core';
import { AuthService } from '@services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  isConnected : boolean ;

  constructor(private auth : AuthService) { }

  ngOnInit(): void {
    this.auth.isConnected().subscribe((value)=>{
      this.isConnected = value;
    });
  }

}
