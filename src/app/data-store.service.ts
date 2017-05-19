import { Injectable } from '@angular/core';

import { Observable, BehaviorSubject } from 'rxjs'
import 'rxjs/add/operator/toPromise';

import { BackendService } from './backend.service';

import { Role } from './role';
import { Acode } from './acode';
import { Element } from './element';

@Injectable()
export class DataStoreService {

  private _roles: BehaviorSubject<Role[]>;
  private roles$: Observable<Role[]>

  private _acodes: BehaviorSubject<Acode[]>;
  private acodes$: Observable<Acode[]>

  private _elements: BehaviorSubject<Element[]>;
  private elements$: Observable<Element[]>

  constructor(
    private backendService: BackendService
  ) {
    this._roles = new BehaviorSubject([])
    this.roles$ = this._roles.asObservable();

    this._acodes = new BehaviorSubject([])
    this.acodes$ = this._acodes.asObservable();

    this._elements = new BehaviorSubject([])
    this.elements$ = this._elements.asObservable();

    // load initial data from backend
    this.backendService.getRawDataItems("role")
      .then(data => data.map(dataItem => new Role(dataItem)))
      .then(roles => { this._roles.next(roles); console.log("done loading roles") })
    this.backendService.getRawDataItems("acode")
      .then(data => data.map(dataItem => new Acode(dataItem)))
      .then(acodes => { this._acodes.next(acodes); console.log("done loading acodes") })
    this.backendService.getRawDataItems("element")
      .then(data => data.map(dataItem => new Element(dataItem)))
      .then(elements => { this._elements.next(elements); console.log("done loading elements") })

  }

  getRoles(): Observable<Role[]> {
    return this.roles$;
  }

  getAcodes(): Observable<Acode[]> {
    return this.acodes$;
  }

  getElements(): Observable<Element[]> {
    return this.elements$;
  }

}
