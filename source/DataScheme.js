/**
 * @param {Object} field - Key for Name & Value for `Function` / `RegExp`
 *
 * @return {function(Class: Function): void} Class decorator for Data Scheme
 */
export function schemeOf(field) {

    return  meta => {

        meta.elements.push({
            kind:         'field',
            key:          'meta',
            placement:    'static',
            descriptor:   {enumerable: true},
            initializer:  () => field
        });

        for (let key in field) {

            if (!(field[key] instanceof Array))  field[key] = [ field[key] ];

            meta.elements.push({
                kind:        'method',
                key,
                placement:   'prototype',
                descriptor:  {
                    set:         function (value) {

                        this.constructor.set(key, value);
                    },
                    enmuerable:  true
                }
            });
        }

        meta.finisher = Class => {

            const Super = Object.getPrototypeOf( Class );

            if (Super.meta instanceof Object)
                Object.setPrototypeOf(Class.meta, Super.meta);
        };
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
