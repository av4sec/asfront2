import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

// Observable class extensions
import 'rxjs/add/operator/toPromise';

import { RawDataItem } from './raw-data-item';

@Injectable()
export class BackendService {

  private baseUrl = '/api/';  // URL to web api

  constructor(private http: Http) { }

  getRawDataItems(type: string): Promise<RawDataItem[]> {
    return this.http.get(this.baseUrl + type)
      .toPromise()
      .then(response => response.json() as RawDataItem[])
      //.then(data => { console.log(data); return data })
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

}
