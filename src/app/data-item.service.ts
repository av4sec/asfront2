import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { RawDataItem } from './raw-data-item';
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
        let dataItems = response.json() as RawDataItem[];
        return dataItems.map(dataItem => new Role(dataItem));
      })
      .catch(this.handleError);
  }

  getRole(extid: number): Promise<Role> {
    const url = `${this.baseUrl}role/${extid}`;
    return this.http.get(url)
      .toPromise()
      .then(response => new Role(response.json() as RawDataItem))
      .catch(this.handleError);
  }

  getAcodes(): Promise<Acode[]> {
    const url = `${this.baseUrl}acode`;
    return this.http.get(url)
      .toPromise()
      .then(response => {
        // for all DataItems we create the corresponding Acode objects
        let dataItems = response.json() as RawDataItem[];
        return dataItems.map(dataItem => new Acode(dataItem));
      })
      .catch(this.handleError);
  }

  getAcode(extid: number): Promise<Acode> {
    const url = `${this.baseUrl}acode/${extid}`;
    return this.http.get(url)
      .toPromise()
      .then(response => new Acode(response.json() as RawDataItem))
      .catch(this.handleError);
  }
}
