export {default as default, schemeOf} from './DataScheme';

/**
 * @param {Number} [min=-Infinity]
 * @param {Number} [max=+Infinity]
 * @param {Number} [step=1]
 *
 * @return {function(value: Number): Boolean}
 */
export function Range(min, max, step = 1) {

    min = (min != null)  ?  min  :  -Infinity,
    max = (max != null)  ?  max  :  +Infinity;

    return Object.assign(
        value =>
            (min <= value)  &&  (value <= max)  &&  !((value - min) % step),
        {
            toString:  () => `Range(${ [...arguments] })`
        }
    );
}

/**
 * @type {RegExp}
 */
export const Email = /.+?@(.+?\.){1,}\w+/;

/**
 * @type {RegExp}
 */
export const Phone = /[0-9+-]{7,}/;
