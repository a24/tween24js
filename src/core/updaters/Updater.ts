import { MultiUpdater } from "./MultiUpdater";

export interface Updater {
    constructor:Function;
    init      (useWillChange:boolean):void;
    complete  ():void;
    toString  ():string;
    clone     (target:any, query:string|null):Updater;
    update    (progress:number):void;
    addProp   (key:string, value:number, optoin:string|null):void;
    addPropStr(key:string, value:string, optoin:string|null):void;
    overwrite (updater:Updater|MultiUpdater):void;
    getMaxAbsDelta():number;
}