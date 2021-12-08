import { Component, OnInit } from '@angular/core';
import { RoleGuardService } from '@services/role-guard.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  constructor(private _roleGuard : RoleGuardService) { 
    this._roleGuard.roleCheck(['1']);
  }

  ngOnInit(): void {
    
  }

}
