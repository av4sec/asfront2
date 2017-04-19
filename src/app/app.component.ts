import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { DataItem } from './data-item';
import { Role } from './role';
import { Acode } from './acode';
import { Element } from './element';
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
  elements: Element[];
  items: any[] = Array();

  nbSelected = 0;

  constructor(
    private router: Router,
    private dataItemService: DataItemService)
  { }

  ngOnInit(): void {
    this.getRoles();
    this.getAcodes();
    this.getElements();
  }

  selectionChanged(isSelected: boolean, item: DataItem) {
    if (isSelected)
      this.nbSelected++;
    else
      this.nbSelected--;
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

  getElements(): void {
    this.dataItemService.getElements().then(elements => {
      this.elements = elements;
      this.items = this.items.concat(elements);
    });
  }
}
