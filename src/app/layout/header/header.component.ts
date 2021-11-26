import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  menu = {
    menu_left:[
    {
      title : "Menu",
      href : "/menu"
    },
    {
      title : "Rewards",
      href : "#"
    },
    {
      title : "About-us",
      href : "#"
    }
  ],
  menu_right:[
    {
      title : "Gift-Center",
      href : "/gifts"
    },
    {
      title : "Reservation",
      href : "#"
    },
    {
      title : "Order",
      href : "/order"
    }
  ]
};

  constructor() { }

  ngOnInit(): void {
  }

}
