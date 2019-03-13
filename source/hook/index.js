const hook = { };


/**
 * Hook listener
 *
 * @param {String}                       name
 * @param {function(data: Object): void} handler
 */
export function listen(name, handler) {

    (hook[name] = hook[name] || [ ]).push( handler );
}


/**
 * Hook trigger
 *
 * @param {String} name
 * @param {Object} data
 */
export function trigger(name, data) {

    if ( hook[name] )  hook[name].forEach(func  =>  func( data ));
}


/**
 * Hookable decorator for RESTful API
 *
 * @param {String} method
 * @param {String} path
 * @param {String} [contentType='application/json']
 *
 * @return {function(meta: DecoratorDescriptor): void}
 */
export function HTTP(
    method,  path,  contentType = 'application/json'
) {
    return  meta => {

        meta.finisher = (Class) => {

            trigger('HTTP',  {Class, method, path, contentType});
        };
    };
}
