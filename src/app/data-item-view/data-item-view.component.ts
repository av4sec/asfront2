import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';

import { DataItem } from '../data-item';

@Component({
  selector: 'data-item-view',
  templateUrl: './data-item-view.component.html',
  styleUrls: ['./data-item-view.component.css']
})
export class DataItemViewComponent implements OnInit {

  class: string;

  @Input()
  item: DataItem;
  @Input()
  selected: boolean = false;

  @Output()
  select = new EventEmitter<boolean>();
  @Output()
  buttonEvent = new EventEmitter();

  constructor() { }

  ngOnInit() {
    let className = this.item.constructor.name.toLowerCase();
    this.class = className + '-item';
  }

  itemSelected() {
    console.log(this.item.name + ": itemSelected");
    this.selected = !this.selected;
    this.select.emit(this.selected);
  }

  buttonClicked() {
    console.log(this.item.name + ": buttonClicked");
    this.buttonEvent.emit();
  }
}
