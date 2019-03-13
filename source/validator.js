import { typeOf, isClass } from './utility/index';

import Model from './Model';

import { trigger } from './hook/index';


const base_type = [Number, String, Boolean, Date, RegExp, Object, Array];

function check(value, condition, key, data) {

    const type = typeOf( data );

    if (base_type.includes( condition )  ||  isClass( condition )) {

        if (Object(value) instanceof String)  try {

            value = JSON.parse( value );

        } catch (error) {/**/}

        value = Object( value );

        if (
            (condition === Object)  ?
                (value.constructor !== Object)  :  !(value instanceof condition)
        )
            throw TypeError(`"${key}" of ${type} should be ${condition.name}`);

    } else if (condition instanceof Function) {
        /**
         * Throw an Error is recommended when something is wrong
         *
         * @typedef {function(value: *, key: String, data: Model): void} ModelValueHandler
         */
        condition(value, key, data);

    } else if (condition instanceof RegExp) {

        if (! condition.test(value + ''))
            throw TypeError(`"${key}" of ${type} should match /${condition.source}/`);

    } else if (condition instanceof Array)
        if (! condition.includes( value ))
            throw TypeError(`"${key}" of ${type} should be in ${condition.join(', ')}`);
}

/**
 * Field Decorator to validate the value of Setter
 *
 * @param {Function|RegExp|Array|ModelValueHandler} condition
 * @param {*}                                       [defaultValue]
 *
 * @return {function(meta: DecoratorDescriptor): void}
 */
export function is(condition, defaultValue) {

    return  meta => {

        const { kind, placement, key, descriptor } = meta;

        const origin = descriptor.set;

        descriptor.set = function (value) {

            value = (value != null) ? value : defaultValue;

            if (!(value != null))  return this.delete( key );

            if (condition.prototype instanceof Model)
                value = new condition( value );
            else
                check(value, condition, key, this);

            origin.call(this, value);
        };

        meta.finisher = Class => {

            trigger('is',  {Class, kind, placement, key, descriptor});
        };
    };
}
