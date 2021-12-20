import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RoleGuardService } from '@services/role-guard.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  toDay : any;
  datepipe : DatePipe = new DatePipe('en-US');
  selected : boolean = false ;

  constructor(private route : ActivatedRoute ) { }

  ngOnInit(): void {
    setInterval(() => {
      this.toDay = this.datepipe.transform(new Date(), 'dd-MM-YYYY HH:mm:ss') ;
    }, 1);
    this.route.firstChild?.url.subscribe((data)=>{
      this.selected = true;
    })
  }


}
