import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { Role } from './role';
import { Acode } from './acode';
import { DataItemService } from './data-item.service';

@Component({
  selector: 'asfront-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'asfront2 works!';

  roles: Role[];
  acodes: Acode[];
  items: any[] = Array();

  constructor(
    private router: Router,
    private dataItemService: DataItemService)
  { }

  ngOnInit(): void {
    this.getRoles();
    this.getAcodes();
  }

  getRoles(): void {
    this.dataItemService.getRoles().then(roles => {
      this.roles = roles;
      this.items = this.items.concat(roles);
    });
  }

  getAcodes(): void {
    this.dataItemService.getAcodes().then(acodes => {
      this.acodes = acodes;
      this.items = this.items.concat(acodes);
    });
  }
}
