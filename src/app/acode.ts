import { DataItem, DataItemRef } from './data-item';

export class Acode {
    id: DataItemRef;
    extid: number;
    name: string;
    charid: string;

    roles: DataItemRef[];

    // The constructor is used to extract the relevant data from a generic DataItem
    constructor(dataItem: DataItem) {
        this.id = dataItem.id;          // @todo: I'm not sure we really need this
        this.extid = dataItem.extid;
        this.name = dataItem.curr.name;
        this.charid = dataItem.curr.charid;
        this.roles = dataItem.curr.roles;
    }
}
