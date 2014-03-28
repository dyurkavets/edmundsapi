define(function() {

    var utils = (function() {

        var arrayPrototype = Array.prototype,
            nativeForEach = arrayPrototype.forEach,
            slice = arrayPrototype.slice,
            exports = {};

        /**
         * Converts an arguments object into an array.
         * @method argsToArray
         * @param {Arguments} args An arguments object
         * @return {Array}
         */
        exports.argsToArray = function(args) {
            return slice.call(args);
        };

        /**
         * Fills in undefined properties in destination object with values from the source objects,
         * and returns the object.
         * @method defaults
         * @param {Object} destination
         * @param {Object} [source]*
         * @returns {Object}
         */
        exports.defaults = function(destination) {
            var sources = slice.call(arguments, 1);
            exports.forEach(sources, function(source) {
                var key;
                if (source) {
                    for (key in source) {
                        if (destination[key] === void 0) {
                            destination[key] = source[key];
                        }
                    }
                }
            });
            return destination;
        };

        /**
         * Copies all of the properties in the source objects over to the destination object.
         * @method extend
         * @param {Object} destination An object to be extended.
         * @param {Object} [source]* An object which properties to be copied into destination.
         * @return {Object}
         */
        exports.extend = function(destination) {
            var sources = slice.call(arguments, 1);
            exports.forEach(sources, function(source) {
                var key;
                if (source) {
                    for (key in source) {
                        destination[key] = source[key];
                    }
                }
            });
            return destination;
        };

        /**
         * Executes a provided function once per array element.
         * @method forEach
         * @param {Array} array An array
         * @param {Function} callback Function to execute for each element.
         *     @param {any} callback.value The element value.
         *     @param {Number} callback.index The element index.
         *     @param {Array} callback.array The array being traversed.
         * @param {Object} [thisObject] Value to use as this when executing callback.
         */
        exports.forEach = function(array, callback, thisObject) {
            var index, length;
            if (nativeForEach) {
                return nativeForEach.call(array, callback, thisObject);
            }
            if (!exports.isFunction(callback)) {
                throw new TypeError(callback + ' is not a function');
            }
            for (index = 0, length = array.length; index < length; index++) {
                callback.call(thisObject, array[index], index, array);
            }
        };

        /**
         * Returns true if an object is a function, false if it is not.
         * @method isFunction
         * @param {any} obj The object to be checked.
         * @return {Boolean}
         */
        exports.isFunction = function(obj) {
            return typeof obj === 'function';
        };

        /**
         * Returns a copy of the object, filtered to only have values for the whitelisted keys.
         * @method pick
         * @param {Object} obj An object which properties to be copied.
         * @param {Array} keys A list of properties to be copied.
         * @returns {Object}
         */
        exports.pick = function(obj, keys) {
            var copy = {};
            exports.forEach(keys, function(key) {
                copy[key] = obj[key];
            });
            return copy;
        };

        return exports;

    }());

    return utils;

});
