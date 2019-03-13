import { typeOf } from '../utility/index';


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
export const URI = /^\w+:\S+$/;

/**
 * @type {RegExp}
 */
export const Phone = /^[0-9+-]{7,}$/;


/**
 * @param {*}      value
 * @param {String} key
 * @param {Model}  data
 *
 * @throw {SyntaxError}
 */
export function IPv4(value, key, data) {

    value = (value + '').split('.').filter( Boolean );

    if (
        (value.length !== 4)  ||
        !value.every(number => (
            /^[\dxA-Fa-f]+$/.test( number )  &&
            (number > -1  &&  number < 256)
        ))
    )
        throw SyntaxError(
            `"${key}" of ${typeOf( data )} should be an IPv4 address`
        );
}


/**
 * @param {*}      value
 * @param {String} key
 * @param {Model}  data
 *
 * @throw {SyntaxError}
 */
export function IPv6(value, key, data) {

    const v4 = (/^::ffff:(\S+)/i.exec( value ) || '')[1];

    if ( v4 )
        try {  IPv4(v4, key, data);  return;  } catch (error) {/**/}

    else if (! (/::/g.exec( value ) || '')[1]) {

        value = value.split( /::|:/ );

        if (
            (value.length > 1 && value.length < 9)  &&
            value.every(number => {

                number = parseInt(number, 16);

                return (
                    /^[\da-fA-F]+$/.test( number )  &&
                    (number > -1  &&  number < 65536)
                );
            })
        )
            return;
    }

    throw SyntaxError(
        `"${key}" of ${typeOf( data )} should be an IPv6 address`
    );
}


/**
 * Validator for IP address
 *
 * @param {*}      value
 * @param {String} key
 * @param {Model}  data
 *
 * @throw {SyntaxError}
 */
export function IPA(value, key, data) {
    try {
        IPv4(value, key, data);

    } catch (error) {
        try {
            IPv6(value, key, data);

        } catch (error) {

            throw SyntaxError(
                `"${key}" of ${typeOf( data )} should be an IP address`
            );
        }
    }
}


/**
 * @param {*}      value
 * @param {String} key
 * @param {Model}  data
 *
 * @throw {URIError}
 */
export function HTTP_URL(value, key, data) {

    const [_, domain, port] =  // eslint-disable-line
        /^(?:https?:)?\/\/(?:\S+?(?::\S+?)?@)?([\w-.]+)(?::(\d{1,5}))?/
            .exec( value )  ||  [ ];

    if (port > -1  &&  port < 65536) {

        if (/\.\d\w+$/.test(domain || ''))
            try {  IPA(domain, key, data);  return;  } catch (error) {/**/}
        else
            return;
    }

    throw URIError(
        `"${key}" of ${typeOf( data )} should be a HTTP URL`
    );
}
