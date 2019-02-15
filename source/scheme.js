import { typeOf } from './utility';


/**
 * @param {Number} [min=-Infinity]
 * @param {Number} [max=+Infinity]
 * @param {Number} [step=1]
 *
 * @return {ModelValueHandler}
 */
export function Range(min, max, step = 1) {

    min = (min != null)  ?  min  :  -Infinity,
    max = (max != null)  ?  max  :  +Infinity;

    return  (value, key, data) => {

        if ((min > value)  ||  (value > max)  ||  ((value - min) % step))
            throw RangeError(
                `"${key}" of ${typeOf( data )} should be in range of [${min}, ${max}] with step ${step}`
            );
    };
}

/**
 * @type {RegExp}
 */
export const Email = /^.+?@(.+?\.){1,}\w+$/;

/**
 * @type {RegExp}
 */
export const URL = /^\w+:\S+$/;

/**
 * @type {RegExp}
 */
export const Phone = /^[0-9+-]{7,}$/;
