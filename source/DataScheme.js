/**
 * @param {Object} meta - Key for Name & Value for `Function` / `RegExp`
 *
 * @return {function(Class: Function): void} Class decorator for Data Scheme
 */
export function schemeOf(meta) {

    return  Class => {

        Object.defineProperty(Class, 'meta', {
            value:       meta,
            enmuerable:  true
        });

        for (let key in meta) {

            if (!(meta[key] instanceof Array))  meta[key] = [ meta[key] ];

            Object.defineProperty(Class.prototype, key, {
                set:         value => Class.set(key, value),
                enmuerable:  true
            });
        }
    };
}

@schemeOf({
    id:    Number,
    name:  String
})
export default  class DataScheme {
    /**
     * @param {Function|RegExp} scheme
     * @param {*}               value
     *
     * @return {Boolean}
     */
    static check(scheme, value) {

        if (scheme instanceof Function) {

            if (global[scheme.name] === scheme) {

                if (Object(value) instanceof scheme)  return true;
            } else
                return  scheme( value );

        } else if (scheme instanceof RegExp)
            return  scheme.test(value + '');

        return false;
    }

    /**
     * @param {String} key
     * @param {*}      value
     */
    static set(key, value) {

        const scheme = this.meta[ key ];

        if (! scheme.some(item  =>  this.check(item, value)))
            throw TypeError(
                `"${key}" of ${this.name} should be a ${
                    scheme.map(item  =>  (item.name || item + '')).join(' / ')
                }`
            );
    }
}
