export type DataItemRef = string;

// This is the structure used by our backend service to communicate an item
export class DataItem {
    id: DataItemRef;
    extid: number;
    curr: any;
    hist: any[];
    deleted?: boolean;
}
