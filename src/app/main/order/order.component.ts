import { Component, OnInit } from '@angular/core';
import { AuthGuradService } from '../auth/auth-gurad.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {

  constructor(private authGuard : AuthGuradService) { }

  ngOnInit(): void {
    if(this.authGuard.canUse()){
      
    }
  }

}
