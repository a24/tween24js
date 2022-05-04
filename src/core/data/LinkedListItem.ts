export class LinkedListItem {

    private _item:any;
    prev:LinkedListItem|null;
    next:LinkedListItem|null;

    constructor (item:any) {
        this._item = item;
        this.prev = null;
        this.next = null;
    }

    get item():any {
        return this._item;
    }
}