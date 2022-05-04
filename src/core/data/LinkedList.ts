import { LinkedListItem } from "./LinkedListItem";

export class LinkedList {

    private _first:LinkedListItem|null;
    private _last:LinkedListItem|null;
    private _length:number;

    constructor (...items:any) {
        this._first = null;
        this._last = null;
        this._length = 0;

        if (items) {
            for (const item of items) {
                this.push(item);
            }
        }
    }

    push = (item:any):LinkedListItem => {
        const i = new LinkedListItem(item);
        if (this._last) {
            this._last.next = i;
            i.prev = this._last;
        }
        else {
            this._first = i;
        }
        this._last = i;
        this._length ++;
        return i;
    }

    pop = ():any => {
        if (this._last) {
            const item = this._last;
            this.remove(item);
            return item.item;
        }
        return null;
    } 

    remove = (listItem:LinkedListItem) => {
        if (listItem.prev) listItem.prev.next = listItem.next;
        if (listItem.next) listItem.next.prev = listItem.prev;

        if (this._first == listItem) {
            this._first = listItem.next;
        }
        if (this._last == listItem) {
            this._last = listItem.prev;
        }
        listItem.prev = listItem.next = null;
        this._length --;
    }

    delete = (item:any):boolean => {
        if (this._first) {
            let target = this._first;

            while (target.next && target.item != item) {
                target = target.next;
            }
            if (target.item == item) {
                this.remove(target);
                return true;
            }
            else return false;
        }
        return false;
    }

    map = (callback:((item:any, index:number)=>any)) => {
        let index = 0;
        let next = this._first;
        while (next) {
            callback(next.item, index);
            index ++;
            next = next.next;
        }
    }

    dispose = () => {
        this._first = null;
        this._last = null;
        this._length = 0;
    }

    toString = ():string => {
        let result = "";
        let index = 0;
        let next = this._first;
        while (next) {
            result += index + " : " + next + "\n";
            next = next.next;
            index ++;
        }
        return result.trim();
    }

    get length():number {
        return this._length;
    }
}