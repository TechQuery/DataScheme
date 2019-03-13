import { walkPrototype } from './utility/index';


const model_observer = Symbol('Model observer');


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

        this[model_observer] = { };

        this.forEach((value, key)  =>  (this[key] = data[key]));
    }

    /**
     * @param {ModelValueHandler} callback
     */
    forEach(callback) {

        for (const prototype  of  walkPrototype( this )) {

            if (prototype === Model.prototype)  break;

            const scheme = Object.getOwnPropertyDescriptors( prototype );

            for (let key in scheme)
                if ( scheme[key].set )  callback(this.get(key), key, this);
        }
    }

    /**
     * @return {Object}
     */
    valueOf() {

        const data = { };

        this.forEach((value, key)  =>  {

            if (this.has( key ))  data[key] = value ? value.valueOf() : value;
        });

        return data;
    }

    /**
     * @param {Object} keyHandler - Keys for Property names, Values for {@link ValueChangedHandler}
     */
    observe(keyHandler) {

        const map = this[model_observer];

        for (let key in keyHandler)
            (map[key] = map[key] || [ ]).push( keyHandler[key] );
    }

    /**
     * @param {Object} keyHandler - Keys for Property names, Values for {@link ValueChangedHandler}
     */
    unobserve(keyHandler) {

        const map = this[model_observer];

        for (let key in keyHandler)
            if ( map[key] ) {

                const index = map[key].indexOf( keyHandler[key] );

                if (index > -1)  map[key].splice(index, 1);
            }
    }

    /**
     * @param {*} key
     * @param {*} value
     *
     * @return {Model}
     */
    set(key, value) {

        const old = this.get( key );

        if (old !== value) {

            super.set(key, value);

            /**
             * @typedef {Function} ValueChangedHandler
             *
             * @this {Model}
             *
             * @param {*} value
             * @param {*} oldValue
             */
            (this[model_observer][key]  ||  [ ]).forEach(
                handler  =>  handler.call(this, value, old)
            );
        }

        return this;
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
