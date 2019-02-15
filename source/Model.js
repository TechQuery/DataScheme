/**
 * @abstract
 */
export default class Model extends Map {
    /**
     * @param {Object} [data={}]
     */
    constructor(data = {}) {

        if (super().constructor === Model)
            throw TypeError('Model() is an Abstract Class');

        this.forEach((value, key)  =>  (this[key] = data[key]));
    }

    /**
     * @param {ModelValueHandler} callback
     */
    forEach(callback) {

        const prototype = Object.getPrototypeOf( this );

        const scheme = Object.getOwnPropertyDescriptors( prototype );

        for (let key in scheme)
            if ( scheme[key].set )  callback(this.get(key), key, this);
    }

    /**
     * @return {Object}
     */
    valueOf() {

        const data = { };

        this.forEach((value, key)  =>  {

            if (this.has( key ))  data[key] = value;
        });

        return data;
    }
}


/**
 * Class Decorator to set same name Getters of existed Setters
 *
 * @param {DecoratorDescriptor} meta
 */
export function mapGetter({ elements }) {

    elements.forEach(({ key, placement, descriptor })  =>  {

        if ((placement === 'prototype')  &&  descriptor.set  &&  !descriptor.get)
            descriptor.get = function () {

                return  this.get( key );
            };
    });
}
