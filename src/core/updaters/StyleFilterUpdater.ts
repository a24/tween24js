import { MultiParamUpdater } from "./MultiParamUpdater";

export class StyleFilterUpdater {

    private _target    :HTMLElement;
    private _key       :string;

    private _blur      :MultiParamUpdater|null;
    private _brightness:MultiParamUpdater|null;
    private _contrast  :MultiParamUpdater|null;
    private _grayscale :MultiParamUpdater|null;
    private _hue       :MultiParamUpdater|null;
    private _invert    :MultiParamUpdater|null;
    private _opacity   :MultiParamUpdater|null;
    private _saturate  :MultiParamUpdater|null;
    private _sepia     :MultiParamUpdater|null;
    private _shadow    :MultiParamUpdater|null;

    constructor(target:HTMLElement) {
        this._key        = "filter";
        this._target     = target;

        this._blur       = null;
        this._brightness = null;
        this._contrast   = null;
        this._grayscale  = null;
        this._hue        = null;
        this._invert     = null;
        this._opacity    = null;
        this._saturate   = null;
        this._sepia      = null;
        this._shadow     = null;
    }

    init = (start:string) => {
        if (!this._blur       && start.indexOf("blur"      ) > -1) this._blur       = this._getUpdater("blur"       );
        if (!this._grayscale  && start.indexOf("grayscale" ) > -1) this._grayscale  = this._getUpdater("grayscale"  );
        if (!this._hue        && start.indexOf("hue"       ) > -1) this._hue        = this._getUpdater("hue"        );
        if (!this._invert     && start.indexOf("invert"    ) > -1) this._invert     = this._getUpdater("invert"     );
        if (!this._sepia      && start.indexOf("sepia"     ) > -1) this._sepia      = this._getUpdater("sepia"      );
        if (!this._shadow     && start.indexOf("shadow"    ) > -1) this._shadow     = this._getUpdater("drop-shadow");
        if (!this._brightness && start.indexOf("brightness") > -1) this._brightness = this._getUpdater("brightness" );
        if (!this._contrast   && start.indexOf("contrast"  ) > -1) this._contrast   = this._getUpdater("contrast"   );
        if (!this._opacity    && start.indexOf("opacity"   ) > -1) this._opacity    = this._getUpdater("opacity"    );
        if (!this._saturate   && start.indexOf("saturate"  ) > -1) this._saturate   = this._getUpdater("saturate"   );

        this._blur      ?.init(start);
        this._grayscale ?.init(start);
        this._hue       ?.init(start);
        this._invert    ?.init(start);
        this._sepia     ?.init(start);
        this._shadow    ?.init(start);
        this._brightness?.init(start.indexOf("brightness") > -1 ? start : "brightness(1)");
        this._contrast  ?.init(start.indexOf("contrast"  ) > -1 ? start : "contrast(1)"  );
        this._opacity   ?.init(start.indexOf("opacity"   ) > -1 ? start : "opacity(1)"   );
        this._saturate  ?.init(start.indexOf("saturate"  ) > -1 ? start : "saturate(1)"  );
    }

    addPropStr = (key:string, value:string) => {
        if (key.indexOf("shadow") > -1) {
            this._shadow ||= this._getUpdater("drop-shadow");
            if      (key.indexOf("x")     > -1) this._shadow.addPropStr(0, value);
            else if (key.indexOf("y")     > -1) this._shadow.addPropStr(1, value);
            else if (key.indexOf("blur")  > -1) this._shadow.addPropStr(2, value);
            else if (key.indexOf("color") > -1) this._shadow.addPropColor(value);
        }
        else {
            const updater = this._getUpdater(key);
            updater.addPropStr(0, value);
            switch (key) {
                case "blur"       : this._blur       = updater; break;
                case "contrast"   : this._contrast   = updater; break;
                case "grayscale"  : this._grayscale  = updater; break;
                case "hue-rotate" : this._hue        = updater; break;
                case "invert"     : this._invert     = updater; break;
                case "opacity"    : this._opacity    = updater; break;
                case "saturate"   : this._saturate   = updater; break;
                case "sepia"      : this._sepia      = updater; break;
                case "brightness" : this._brightness = updater; break;
                case "shadow"     : this._shadow     = updater; break;
            }
        }
    }

    private _getUpdater = (key:string):MultiParamUpdater => {
        if (key == "drop-shadow") return new MultiParamUpdater(this._target, this._key, "drop-shadow", 3, true);
        else                      return new MultiParamUpdater(this._target, this._key, key, 1);
    }

    update = (progress:number):string => {
        let result = "";
        if (this._blur      ) result += this._blur      .update(progress);
        if (this._contrast  ) result += this._contrast  .update(progress);
        if (this._grayscale ) result += this._grayscale .update(progress);
        if (this._hue       ) result += this._hue       .update(progress);
        if (this._invert    ) result += this._invert    .update(progress);
        if (this._opacity   ) result += this._opacity   .update(progress);
        if (this._saturate  ) result += this._saturate  .update(progress);
        if (this._sepia     ) result += this._sepia     .update(progress);
        if (this._brightness) result += this._brightness.update(progress);
        if (this._shadow    ) result += this._shadow    .update(progress);
        return result;
    }

    overwrite = (updater:StyleFilterUpdater) => {
        if (updater._blur      ) this._blur      ?.overwrite(updater._blur);
        if (updater._contrast  ) this._contrast  ?.overwrite(updater._contrast);
        if (updater._grayscale ) this._grayscale ?.overwrite(updater._grayscale);
        if (updater._hue       ) this._hue       ?.overwrite(updater._hue);
        if (updater._invert    ) this._invert    ?.overwrite(updater._invert);
        if (updater._opacity   ) this._opacity   ?.overwrite(updater._opacity);
        if (updater._saturate  ) this._saturate  ?.overwrite(updater._saturate);
        if (updater._sepia     ) this._sepia     ?.overwrite(updater._sepia);
        if (updater._brightness) this._brightness?.overwrite(updater._brightness);
        if (updater._shadow    ) this._shadow    ?.overwrite(updater._shadow);
    }

    getDelta = ():number => {
        const deltas = [];
        deltas.push(this._blur      ?.getDelta() || 1);
        deltas.push(this._contrast  ?.getDelta() || 1);
        deltas.push(this._grayscale ?.getDelta() || 1);
        deltas.push(this._invert    ?.getDelta() || 1);
        deltas.push(this._opacity   ?.getDelta() || 1);
        deltas.push(this._saturate  ?.getDelta() || 1);
        deltas.push(this._hue       ?.getDelta() || 1);
        deltas.push(this._sepia     ?.getDelta() || 1);
        deltas.push(this._brightness?.getDelta() || 1);
        deltas.push(this._shadow    ?.getDelta() || 1);
        return Math.max(...deltas);
    }

    clone = (target:HTMLElement):StyleFilterUpdater => {
        const sfu = new StyleFilterUpdater(target);
        if (this._blur      ) sfu._blur       = this._blur      .clone(target);
        if (this._contrast  ) sfu._contrast   = this._contrast  .clone(target);
        if (this._grayscale ) sfu._grayscale  = this._grayscale .clone(target);
        if (this._hue       ) sfu._hue        = this._hue       .clone(target);
        if (this._invert    ) sfu._invert     = this._invert    .clone(target);
        if (this._opacity   ) sfu._opacity    = this._opacity   .clone(target);
        if (this._saturate  ) sfu._saturate   = this._saturate  .clone(target);
        if (this._sepia     ) sfu._sepia      = this._sepia     .clone(target);
        if (this._brightness) sfu._brightness = this._brightness.clone(target);
        if (this._shadow    ) sfu._shadow     = this._shadow    .clone(target);
        return sfu;
    }
    
    toString = ():string => {
        let result = "";
        if (this._blur      ?.isUpdate) result += this._blur      .toString() + " ";
        if (this._contrast  ?.isUpdate) result += this._contrast  .toString() + " ";
        if (this._grayscale ?.isUpdate) result += this._grayscale .toString() + " ";
        if (this._hue       ?.isUpdate) result += this._hue       .toString() + " ";
        if (this._invert    ?.isUpdate) result += this._invert    .toString() + " ";
        if (this._opacity   ?.isUpdate) result += this._opacity   .toString() + " ";
        if (this._saturate  ?.isUpdate) result += this._saturate  .toString() + " ";
        if (this._sepia     ?.isUpdate) result += this._sepia     .toString() + " ";
        if (this._brightness?.isUpdate) result += this._brightness.toString() + " ";
        if (this._shadow    ?.isUpdate) result += this._shadow    .toString();
        return result.trim();
    }

    get key():string {
        return this._key;
    }
}