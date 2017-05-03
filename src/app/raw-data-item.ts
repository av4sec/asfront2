export type DataItemRef = string;

// This is the structure used by our backend service to communicate an item
export class RawDataItem {
    id: DataItemRef;
    extid: number;
    curr: any;
    hist: any[];
    type?: string;
    deleted?: boolean;

    constructor(init?: Partial<RawDataItem>) {
        Object.assign(this, init);
    }
}
