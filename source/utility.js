const { toString } = Object.prototype;

/**
 * @param {*} object
 *
 * @return {String} Class name
 */
export function typeOf(object) {

    return  object.constructor.name  ||  toString.call( object ).slice(8, -1);
}


/**
 * @typedef {Object} DecoratorDescriptor
 *
 * @property {String}                kind         - `class`, `field` or `method`
 * @property {String}                [key]        - Member name
 * @property {String}                [placement]  - `static` or `prototype`
 * @property {Object}                [descriptor] - Last parameter of `Object.defineProperty()`
 * @property {DecoratorDescriptor[]} [elements]   - Class members
 */
