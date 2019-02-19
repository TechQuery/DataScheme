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
 * @param {Function} func
 *
 * @return {Boolean}
 */
export function isClass(func) {  return  /^class\W/.test(func + '');  }


/**
 * @param {*} object
 *
 * @yield {Object}
 */
export function* walkPrototype(object) {

    while (object = Object.getPrototypeOf( object ))  yield object;
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
