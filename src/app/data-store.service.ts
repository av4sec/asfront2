import { Injectable } from '@angular/core';

import { Observable, BehaviorSubject } from 'rxjs'
import 'rxjs/add/operator/toPromise';

import { BackendService } from './backend.service';

import { RawDataItem, DataItem, DataItemRef, DataItemType } from './data-item';
import { Role } from './role';
import { Acode } from './acode';
import { Element } from './element';

// Configuration class used internally to store data related to a specific type
class DataItemConfig {
  type: DataItemType;
  className: string;
  initialLoad: boolean = false;
  _dataItems: BehaviorSubject<DataItem[]>;
  dataItems$: Observable<DataItem[]>;
  transformer: (rawItem: RawDataItem) => DataItem;
}

@Injectable()
export class DataStoreService {

  private _dataItemConfig: { [key: string]: DataItemConfig; } = {};

  constructor(
    private backendService: BackendService
  ) {
    this.dataItemConfig(DataItemType.role, Role.name, dataItem => new Role(dataItem));
    this.dataItemConfig(DataItemType.acode, Acode.name, dataItem => new Acode(dataItem));
    this.dataItemConfig(DataItemType.element, Element.name, dataItem => new Element(dataItem));
  }

  // configure data item, its associated internal Subject and the externally accessible Observable
  dataItemConfig(type: DataItemType, className: string, dataItemTransformer: (rawItem: RawDataItem) => DataItem) {
    console.log(`dataItemConfig(${DataItemType[type]})`)
    let config = new DataItemConfig();
    config.type = type;
    config._dataItems = new BehaviorSubject([]);
    config.dataItems$ = config._dataItems.asObservable();
    config.transformer = dataItemTransformer;

    this._dataItemConfig[type] = config;
  }

  // return the items or load them from the backend
  getItems(type: DataItemType): Observable<DataItem[]> {
    console.log(`getItems(${DataItemType[type]})`)
    let config = this._dataItemConfig[type]
    if (!config) {
      throw new Error(`Type ${DataItemType[type]} has not been configured with dataItemConfig() `);
    }

    // trigger initial load for this item 
    if (!config.initialLoad) {
      console.log(`${DataItemType[type]} initial loading`)
      config.initialLoad = true;
      this.backendService.getRawDataItems(DataItemType[type])
        .then(data => data.map(config.transformer))
        .then(items => { config._dataItems.next(items); console.log(`done loading ${DataItemType[type]}`) })
    }
    return config.dataItems$;
  }

  getItem(type: DataItemType, id: DataItemRef): Observable<DataItem> {
    return this.getItems(type).map(roles => roles.filter(role => role.id === id)[0])
  }

  // search function which allows applying a generic filtering
  searchItems(type: DataItemType, predicate: (role: DataItem) => boolean): Observable<DataItem[]> {
    return this.getItems(type).map(roles => roles.filter(predicate))
  }

  // search function applying regular expressions onto multiple attributes
  searchItemsMatching(type: DataItemType, term: string): Observable<DataItem[]> {
    console.log(`searchItemsMatching(${term})`);

    // Split query string into object attributes
    let matcherObj = this.matcherObjForTerm(term)

    // Process all items and filter for the relevant ones
    return this.searchItems(type, role => this.matchObjVsMatcherObj(role, matcherObj) > 0);
  }


  // Utility function to create an object containing attributes and their corresponding search queries
  private matcherObjForTerm(term: string): any {
    let matcherObj: any = {};

    // Shortcut for extid search -> #<id>
    term = term.replace(/#(\d+)/, "extid:^$1\$")

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
}
