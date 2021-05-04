export class Sort24 {

    /**
     * 正順の配列を返します。
     * @static
     * @param {any[]} list 元になる配列
     * @return {any[]}
     * @memberof Sort24
     */
    static _Normal(list:any[]):any[] {
        return list.concat();
    }

    /**
     * 逆順にした配列を返します。
     * @static
     * @param {any[]} list 元になる配列
     * @return {any[]}
     * @memberof Sort24
     */
    static _Reverse(list:any[]):any[] {
        console.log(list);
        console.log(list.concat().reverse());
        return list.concat().reverse();
    }

    /**
     * 谷形にした2次元配列を返します。
     * @static
     * @param {any[]} list 元になる配列
     * @return {any[]}
     * @memberof Sort24
     */
    static _Valley(list:any[]):any[] {
        const result:any[] = [];
        const original:any[] = list.concat();
        while (original.length) {
            if (original.length >= 2)
                result.push([original.shift(), original.pop()]);
            else 
                result.push([original.shift()]);
        }
        return result;
    }

    /**
     * 山形にした2次元配列を返します。
     * @static
     * @param {any[]} list 元になる配列
     * @return {any[]}
     * @memberof Sort24
     */
    static _Mountain(list:any[]):any[] {
        const result:any[] = [];
        const half:number = Math.round(list.length / 2);
        const list1:any[] = list.slice(0, half);
        const list2:any[] = list.slice(half);

        if (list1.length != list2.length)
            result.push(list1.pop());

        while (list1.length) {
            result.push([list1.pop(), list2.shift()]);
        }
        return result;
    }

    /**
     * シャッフルにした配列を返します。
     * @static
     * @param {any[]} list 元になる配列
     * @return {any[]}
     * @memberof Sort24
     */
    static _Shuffle(list:any[]):any[] {
        const result:any[] = list.concat();
        for (let i = result.length - 1; i >= 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [result[i], result[j]] = [result[j], result[i]];
        }
        return result;
    }

    /**
     * 偶数と奇数で分離した2次配列を返します。
     * @static
     * @param {any[]} list 元になる配列
     * @return {any[]}
     * @memberof Sort24
     */
    static _EvenAndOdd(list:any[]):any[] {
        const evn:any[] = [];
        const odd:any[] = [];
        for (let i = 0; i < list.length; i++) {
            if (i % 2) odd.push(list[i]);
            else       evn.push(list[i]);
        }
        return [evn, odd];
    }
}