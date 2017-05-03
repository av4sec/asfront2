import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

// Observable class extensions
import 'rxjs/add/observable/of';

// Observable operators
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchMap';

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
export class AppComponent implements OnInit {

  roles: Observable<Role[]>;
  acodes: Observable<Acode[]>;
  elements: Observable<Element[]>;

  private searchTerms = new Subject<string>();

  nbSelected = 0;

  constructor(
    private router: Router,
    private dataItemService: DataItemService)
  { }

  ngOnInit(): void {
    console.log('AppComponent ngOnInit')

    this.roles = this.searchTerms
      .debounceTime(300)        // wait 300ms after each keystroke before considering the term
      .distinctUntilChanged()   // ignore if next search term is same as previous
      .switchMap(term => term   // switch to new observable each time the term changes
        // return the http search observable
        ? this.dataItemService.searchRole(term)
        // or the observable of empty heroes if there was no search term
        : Observable.of<Role[]>([]))
      .catch(error => {
        // TODO: add real error handling
        console.log(error);
        return Observable.of<Role[]>([]);
      });
    this.acodes = this.searchTerms
      .debounceTime(300)        // wait 300ms after each keystroke before considering the term
      .distinctUntilChanged()   // ignore if next search term is same as previous
      .switchMap(term => term   // switch to new observable each time the term changes
        // return the http search observable
        ? this.dataItemService.searchAcode(term)
        // or the observable of empty heroes if there was no search term
        : Observable.of<Acode[]>([]))
      .catch(error => {
        // TODO: add real error handling
        console.log(error);
        return Observable.of<Acode[]>([]);
      });
    this.elements = this.searchTerms
      .debounceTime(300)        // wait 300ms after each keystroke before considering the term
      .distinctUntilChanged()   // ignore if next search term is same as previous
      .switchMap(term => term   // switch to new observable each time the term changes
        // return the http search observable
        ? this.dataItemService.searchElement(term)
        // or the observable of empty heroes if there was no search term
        : Observable.of<Element[]>([]))
      .catch(error => {
        // TODO: add real error handling
        console.log(error);
        return Observable.of<Element[]>([]);
      });
  }

  // Push a search term into the observable stream.
  search(term: string): void {
    this.searchTerms.next(term);
  }

  selectionChanged(isSelected: boolean, item: DataItem) {
    if (isSelected)
      this.nbSelected++;
    else
      this.nbSelected--;
  }
}
