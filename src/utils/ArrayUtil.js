var ArrayUtil = /** @class */ (function () {
    function ArrayUtil() {
    }
    /**
     * 配列から指定したアイテムを削除します。
     *
     * @static
     * @param {(any[]|undefined|null)} array
     * @param {*} item
     * @memberof ArrayUtil
     */
    ArrayUtil.removeItemFromArray = function (array, item) {
        if (array) {
            for (var i = 0; i < array.length; i++) {
                var it = array[i];
                if (item == it) {
                    array.splice(i, 1);
                }
            }
        }
    };
    return ArrayUtil;
}());
export { ArrayUtil };
export default ArrayUtil;
