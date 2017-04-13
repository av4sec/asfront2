import { RawDataItem, DataItem, DataItemRef } from './data-item';

export class Role extends DataItem {

    acodes: DataItemRef[];

    constructor(dataItem: RawDataItem) {
        super(dataItem);
        this.acodes = dataItem.curr.acodes;
    }
}
