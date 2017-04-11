import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { DataItem, DataItemRef } from './data-item';
import { Role } from './role';
import { Acode } from './acode';

@Injectable()
export class DataItemService {

  private baseUrl = '/api/';  // URL to web api

  constructor(private http: Http) { }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }

  getRoles(): Promise<Role[]> {
    const url = `${this.baseUrl}role`;
    return this.http.get(url)
      .toPromise()
      .then(response => {
        // for all DataItems we create the corresponding Role objects
        let dataItems = response.json() as DataItem[];
        return dataItems.map(dataItem => new Role(dataItem));
      })
      .catch(this.handleError);
  }

  getRole(extid: number): Promise<Role> {
    const url = `${this.baseUrl}role/${extid}`;
    return this.http.get(url)
      .toPromise()
      .then(response => new Role(response.json() as DataItem))
      .catch(this.handleError);
  }

  getAcodes(): Promise<Acode[]> {
    // @fixme: This has to be adjusted when our backend supports acode
    //const url = `${this.baseUrl}acode`;
    const url = `${this.baseUrl}role`;
    return this.http.get(url)
      .toPromise()
      .then(response => {
        // @fixme: here we generate fake Acodes from Roles
        let text = response.text().replace(/Role/g, "Acode").replace(/role/g, 'acode').replace(/100/g, '540');
        let dataItems = JSON.parse(text) as DataItem[];
        return dataItems.map(dataItem => new Acode(dataItem));
      })
      .catch(this.handleError);
  }

  getAcode(extid: number): Promise<Acode> {
    const url = `${this.baseUrl}acode/${extid}`;
    return this.http.get(url)
      .toPromise()
      .then(response => new Acode(response.json() as DataItem))
      .catch(this.handleError);
  }
}
