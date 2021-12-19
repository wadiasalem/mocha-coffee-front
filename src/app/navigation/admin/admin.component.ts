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
  selected : HTMLElement | null ;

  constructor(private route : ActivatedRoute ) { }

  ngOnInit(): void {
    this.toDay = this.datepipe.transform(new Date(), 'dd-MM-YYYY HH:mm:ss') ;
    this.route.firstChild?.url.subscribe((data)=>{
      this.menuSelect(data[0].path);
    })
  }

  menuSelect(id : string){
    this.selected?.classList.remove('orange-btn');
    this.selected?.classList.add('white-orange-btn');
    this.selected = document.getElementById(id);
    this.selected?.classList.remove('white-orange-btn');
    this.selected?.classList.add('orange-btn');
  }

}
