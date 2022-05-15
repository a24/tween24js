import { LinkedListItem } from "./LinkedListItem";
export declare class LinkedList {
    private _first;
    private _last;
    private _length;
    constructor(...items: any);
    push: (item: any) => LinkedListItem;
    pop: () => any;
    remove: (listItem: LinkedListItem) => void;
    delete: (item: any) => boolean;
    map: (callback: (item: any, index: number) => any) => void;
    dispose: () => void;
    toString: () => string;
    get length(): number;
}
