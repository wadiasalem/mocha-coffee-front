import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-page-title',
  templateUrl: './page-title.component.html',
  styleUrls: ['./page-title.component.scss']
})
export class PageTitleComponent implements OnInit {

  @Input() title : String = "" ;
  @Input() width : String = "0px" ;

  constructor() { }

  ngOnInit(): void {
  }

}
