import { typeOf } from './utility';


const base_type = [Number, String, Boolean, Date, RegExp, Object, Array];

function check(value, condition, key, data) {

    const type = typeOf( data );

    if (base_type.includes(condition)) {

        if (Object(value) instanceof String)  try {

            value = JSON.parse(value);

        } catch (error) {/**/}

        if (Object( value ).constructor  !==  condition)
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

    return  ({ key, descriptor }) => {

        const origin = descriptor.set;

        descriptor.set = function (value) {

            value = (value != null) ? value : defaultValue;

            if (value != null) {

                check(value, condition, key, this);

                origin.call(this, value);
            } else
                this.delete( key );
        };
    };
}
