import { RawDataItem, DataItem, DataItemRef } from './data-item';

export class Acode extends DataItem {

    roles: DataItemRef[];

    constructor(dataItem: RawDataItem) {
        super(dataItem);
        this.roles = dataItem.curr.roles;
    }
}
