import { Injectable, OnInit } from '@angular/core';
import { Headers, Http } from '@angular/http';

import { Observable } from 'rxjs/Observable';
// Observable class extensions
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/toPromise';

import { RawDataItem } from './raw-data-item';
import { Role } from './role';
import { Acode } from './acode';
import { Element } from './element';

@Injectable()
export class DataItemService {

  private baseUrl = '/api/';  // URL to web api

  // Local cache all objects
  private roles: Role[];
  private acodes: Acode[];
  private elements: Element[];

  constructor(private http: Http) { }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }

  // Utility function to create an object containing attributes and their corresponding search queries
  private matcherObjForTerm(term: string): any {
    let matcherObj: any = {};

    // Shortcut for extid search -> #<id>
    term = term.replace(/#(\d+)/, "extid:$1")

    // Regexp to match the supported search arguments
    const argumentNameRegexp = /(name|charid|extid):/ig

    // If no argument name has been specified we search name and charid
    if (term.search(argumentNameRegexp) == -1) {
      term = "name:" + term + " charid:" + term
    }

    // Generate list of query arguments (name,charid,extid)
    let args = [];
    let match: any;
    while ((match = argumentNameRegexp.exec(term)) !== null) {
      let argName = match[1]
      let argIndex = match.index;
      let strIndex = argIndex + argName.length + 1
      let queryString = ""
      args.push({ argName, argIndex, strIndex, queryString });
      //console.log(argIndex + " match: " + argName)
    }

    // For all query arguments, extract the query string and store them in "matcherObj"
    let lastIndex = term.length
    for (let i = args.length - 1; i >= 0; i--) {
      matcherObj[args[i].argName] = term.substring(args[i].strIndex, lastIndex).trim()
      lastIndex = args[i].argIndex;
    }

    //console.log(matcherObj);
    return matcherObj
  }

  // Utility function to count the search matches of a specific object against a matcher object
  private matchObjVsMatcherObj(obj: any, matcherObj: any): number {
    // Match the object against the patterns of the matcherObj and count the matches
    let matches = 0;
    //console.log("searching " + role)
    for (var key in matcherObj) {
      let queryString = matcherObj[key];
      try {
        let queryRegexp = new RegExp(queryString, "ig")

        //console.log("  checking for " + key + " > " + queryString)
        if (obj.hasOwnProperty(key)) {
          let valueString = String(obj[key])
          //console.log("    found:" + valueString)
          if (queryRegexp.exec(valueString) !== null) {
            matches++;
            //console.log(role.name + " matches " + key + " with " + valueString)
          }
        }
      } catch (error) {
        console.log("Invalid regexp:" + queryString)
      }
    }
    return matches
  }


  getRoles(): Promise<Role[]> {
    if (this.roles) {
      console.log("using cached roles")
      return Observable.of(this.roles).toPromise()
    }
    const url = `${this.baseUrl}role`;
    return this.http.get(url)
      .toPromise()
      .then(response => {
        // for all DataItems we create the corresponding Role objects
        let dataItems = response.json() as RawDataItem[];
        return dataItems.map(dataItem => new Role(dataItem));
      })
      .then((roles) => { this.roles = roles; console.log(this.roles.length + ' roles'); return roles; })
      .catch(this.handleError);
  }

  searchRole(term: string): Promise<Role[]> {
    console.log(`searchRole(${term})`);

    // Split query string into object attributes
    let matcherObj = this.matcherObjForTerm(term)

    // Process all roles and filter for the relevant ones
    return this.getRoles()
      .then(roles => roles.filter((role) => {
        return this.matchObjVsMatcherObj(role, matcherObj) > 0
      }))
  }

  getAcodes(): Promise<Acode[]> {
    if (this.acodes) {
      console.log("using cached acodes")
      return Observable.of(this.acodes).toPromise()
    }
    const url = `${this.baseUrl}acode`;
    return this.http.get(url)
      .toPromise()
      .then(response => {
        // for all DataItems we create the corresponding Acode objects
        let dataItems = response.json() as RawDataItem[];
        return dataItems.map(dataItem => new Acode(dataItem));
      })
      .then((acodes) => { this.acodes = acodes; console.log(this.acodes.length + ' acodes'); return acodes; })
      .catch(this.handleError);
  }

  searchAcode(term: string): Promise<Acode[]> {
    console.log(`searchAcode(${term})`);

    // Split query string into object attributes
    let matcherObj = this.matcherObjForTerm(term)

    // Process all acodes and filter for the relevant ones
    return this.getAcodes()
      .then(acodes => acodes.filter((acode) => {
        return this.matchObjVsMatcherObj(acode, matcherObj) > 0
      }))
  }

  getElements(): Promise<Element[]> {
    if (this.elements) {
      console.log("using cached elements")
      return Observable.of(this.elements).toPromise()
    }
    const url = `${this.baseUrl}element`;
    return this.http.get(url)
      .toPromise()
      .then(response => {
        // for all DataItems we create the corresponding Element objects
        let dataItems = response.json() as RawDataItem[];
        return dataItems.map(dataItem => new Element(dataItem));
      })
      .then((elements) => { this.elements = elements; console.log(this.elements.length + ' elements'); return elements; })
      .catch(this.handleError);
  }

  searchElement(term: string): Promise<Element[]> {
    console.log(`searchElement(${term})`);

    // Split query string into object attributes
    let matcherObj = this.matcherObjForTerm(term)

    // Process all elements and filter for the relevant ones
    return this.getElements()
      .then(elements => elements.filter((element) => {
        return this.matchObjVsMatcherObj(element, matcherObj) > 0
      }))
  }

}
