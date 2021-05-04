import { MultiUpdater } from "./MultiUpdater";

export interface Updater {
    constructor:Function;
    init      ():void;
    complete  ():void;
    toString  ():string;
    clone     (target:any):Updater;
    update    (progress:number):void;
    addProp   (key:string, value:number):void;
    addPropStr(key:string, value:string):void;
    overwrite (updater:Updater|MultiUpdater):void;
    getMaxAbsDelta():number;
}