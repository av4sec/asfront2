import { RawDataItem, DataItem, DataItemRef } from './data-item';

export class Element extends DataItem {

    acodes: DataItemRef[];
    type: string;

    constructor(dataItem: RawDataItem) {
        super(dataItem);
        this.acodes = dataItem.curr.acodes;
        this.type = dataItem.curr.type;
    }
}
