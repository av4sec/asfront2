import { DataItem, DataItemRef } from './data-item';

export class Role {
    id: DataItemRef;
    extid: number;
    name: string;
    charid: string;

    acodes: DataItemRef[];

    // The constructor is used to extract the relevant data from a generic DataItem
    constructor(dataItem: DataItem) {
        this.id = dataItem.id;          // @todo: I'm not sure we really need this
        this.extid = dataItem.extid;
        this.name = dataItem.curr.name;
        this.charid = dataItem.curr.charid;
        this.acodes = dataItem.curr.acodes;
    }
}
