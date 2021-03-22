export class ArrayUtil {
	/**
	 * 配列から指定したアイテムを削除します。
	 *
	 * @static
	 * @param {(any[]|undefined|null)} array
	 * @param {*} item
	 * @memberof ArrayUtil
	 */
	static removeItemFromArray(array:any[]|undefined|null, item:any) {
		if (array) {
			for (var i = 0; i < array.length; i++) {
				var it = array[i];
				if (item == it) {
					array.splice(i, 1);
				}
			}
		}
	}
}

export default ArrayUtil;