import { Component, OnInit } from '@angular/core';
import {Observable} from "rxjs/Observable";
import {Role} from "../role";
import {Acode} from "../acode";
import {Subject} from "rxjs/Subject";
import {Router} from "@angular/router";
import {DataStoreService} from "../data-store.service";
import {DataItem, DataItemType} from "../data-item";
import {Element} from '../element';

@Component({
  selector: 'asfront-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {


  roles: Observable<Role[]>;
  acodes: Observable<Acode[]>;
  elements: Observable<Element[]>;

  private searchTerms = new Subject<string>();

  nbSelected = 0;

  constructor(
    private router: Router,
    private dataStoreService: DataStoreService) { }

  ngOnInit() {
    console.log('AppComponent ngOnInit')
    this.roles = this.dataStoreService.getItems(DataItemType.role);
    this.acodes = this.dataStoreService.getItems(DataItemType.acode);
    this.elements = this.dataStoreService.getItems(DataItemType.element);

    this.roles = this.searchTerms
      .debounceTime(100)        // wait 100ms after each keystroke before considering the term
      .distinctUntilChanged()   // ignore if next search term is same as previous
      .switchMap(term => term   // switch to new observable each time the term changes
        // return the search observable
        ? this.dataStoreService.searchItemsMatching(DataItemType.role, term)
        // or the observable of empty items if there was no search term
        : Observable.of<Role[]>([]))
      .catch(error => {
        // TODO: add real error handling
        console.log(error);
        return Observable.of<Role[]>([]);
      });

    this.acodes = this.searchTerms
      .debounceTime(100)        // wait 100ms after each keystroke before considering the term
      .distinctUntilChanged()   // ignore if next search term is same as previous
      .switchMap(term => term   // switch to new observable each time the term changes
        // return the search observable
        ? this.dataStoreService.searchItemsMatching(DataItemType.acode, term)
        // or the observable of empty items if there was no search term
        : Observable.of<Acode[]>([]))
      .catch(error => {
        // TODO: add real error handling
        console.log(error);
        return Observable.of<Acode[]>([]);
      });
    this.elements = this.searchTerms
      .debounceTime(100)        // wait 100ms after each keystroke before considering the term
      .distinctUntilChanged()   // ignore if next search term is same as previous
      .switchMap(term => term   // switch to new observable each time the term changes
        // return the search observable
        ? this.dataStoreService.searchItemsMatching(DataItemType.element, term)
        // or the observable of empty items if there was no search term
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
