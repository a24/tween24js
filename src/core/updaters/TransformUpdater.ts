import Matrix from "../../geom/Matrix";
import HTMLUtil from "../../utils/HTMLUtil";
import ParamUpdater from "./ParamUpdater";
import Updater from "./Updater";

export class TransformUpdater implements Updater {
	// private static _chache:Matrix|null = null;
	
    private static _chache:Map<HTMLElement, Matrix>;

	private _target: HTMLElement;
	private _x: ParamUpdater|null;
	private _y: ParamUpdater|null;
	private _scaleX: ParamUpdater|null;
	private _scaleY: ParamUpdater|null;
	private _skewX: ParamUpdater|null;
	private _skewY: ParamUpdater|null;
	private _rotation: ParamUpdater|null;
	private _updateX: boolean;
	private _updateY: boolean;
	private _updateScaleX: boolean;
	private _updateScaleY: boolean;
	private _updateSkewX: boolean;
	private _updateSkewY: boolean;
	private _updateRotation: boolean;
	private _matrix: Matrix;

	constructor(target: any) {
		if (!TransformUpdater._chache) TransformUpdater._chache = new Map<HTMLElement, Matrix>();

		this._target = target;

		this._x        = null;
		this._y        = null;
		this._scaleX   = null;
		this._scaleY   = null;
		this._skewX    = null;
		this._skewY    = null;
		this._rotation = null;

		this._updateX        = false;
		this._updateY        = false;
		this._updateScaleX   = false;
		this._updateScaleY   = false;
		this._updateSkewX    = false;
		this._updateSkewY    = false;
		this._updateRotation = false;

		this._matrix = new Matrix();
	}

	init() {
		const chache: Matrix|undefined = TransformUpdater._chache.get(this._target);
		if (chache)
			this._matrix = Matrix.copy(this._matrix, chache);
		else
			this._matrix.setMatrixByCSSTransform(HTMLUtil.getTransformMatrix(this._target));
		
		this._updateX        = this._x        ? true : false;
		this._updateY        = this._y        ? true : false;
		this._updateScaleX   = this._scaleX   ? true : false;
		this._updateScaleY   = this._scaleY   ? true : false;
		// this._updateSkewX    = this._skewX    ? true : false;
		// this._updateSkewY    = this._skewY    ? true : false;
		this._updateRotation = this._rotation ? true : false;

		this._x?.init(this._matrix.x);
		this._y?.init(this._matrix.y);
		this._scaleX?.init(this._matrix.scaleX);
		this._scaleY?.init(this._matrix.scaleY);
		this._rotation?.init(this._matrix.rotation);
	}

	addProp(key: string, value: number) {
		let p: ParamUpdater|null = null;
		switch (key) {
			case "x":        p = this._x        = new ParamUpdater(key, value); break;
			case "y":        p = this._y        = new ParamUpdater(key, value); break;
			case "scaleX":   p = this._scaleX   = new ParamUpdater(key, value); break;
			case "scaleY":   p = this._scaleY   = new ParamUpdater(key, value); break;
			// case "skewX":    p = this._skewX    = new ParamUpdater(key, value); break;
			// case "skewY":    p = this._skewY    = new ParamUpdater(key, value); break;
			case "rotation": p = this._rotation = new ParamUpdater(key, value); break;
		}
	}

	update(progress: number) {
		const chache: Matrix|undefined = TransformUpdater._chache.get(this._target);
		if (chache && chache != this._matrix)
			this._matrix = Matrix.copy(this._matrix, chache);

		if (this._updateX && this._x) this._matrix.x = this._x.update(progress);
		if (this._updateY && this._y) this._matrix.y = this._y.update(progress);
		if (this._updateScaleX && this._scaleX) this._matrix.scaleX = this._scaleX.update(progress);
		if (this._updateScaleY && this._scaleY) this._matrix.scaleY = this._scaleY.update(progress);
		// if (this._updateSkewX   ) this._skewX   ?.update(progress);
		// if (this._updateSkewY   ) this._skewY   ?.update(progress);
		if (this._updateRotation && this._rotation) this._matrix.rotation = this._rotation.update(progress);

		this._matrix.updateMatrix();
		HTMLUtil.setTransformMatrix(this._target, this._matrix.toString());

		TransformUpdater._chache.set(this._target, this._matrix);
	}

	overwrite(updater: TransformUpdater) {
		if (updater._updateX       ) this._updateX        = false;
		if (updater._updateY       ) this._updateY        = false;
		if (updater._updateScaleX  ) this._updateScaleX   = false;
		if (updater._updateScaleY  ) this._updateScaleY   = false;
		// if (updater._updateSkewX   ) this._updateSkewX    = false;
		// if (updater._updateSkewY   ) this._updateSkewY    = false;
		if (updater._updateRotation) this._updateRotation = false;
	}

	complete() {
		TransformUpdater._chache.delete(this._target);
	}
}

export default TransformUpdater;