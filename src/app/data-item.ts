import { DataItemRef, RawDataItem } from './raw-data-item';

// re-export the imported type and class
export { DataItemRef, RawDataItem }

// This is the structure used by our backend service to communicate an item
export class DataItem {
    id: DataItemRef;
    extid: number;
    name: string;
    charid: string;

    // The constructor is used to extract the relevant data from a generic DataItem
    constructor(dataItem: RawDataItem) {
        this.id = dataItem.id;          // @todo: I'm not sure we really need this
        this.extid = dataItem.extid;
        this.name = dataItem.curr.name;
        this.charid = dataItem.curr.charid;
    }
}

// Currently implemented types
export enum DataItemType {
    role, acode, element
};
