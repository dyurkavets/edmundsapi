define(['./utils', 'exports'], function(utils, exports) {

    /**
     * @class EdmundsApi
     * @param {String} apiKey
     * @constructor
     */
    function EdmundsApi(apiKey) {

        var
            /**
             * @private
             * @attribure _apiKey
             * @type {String}
             */
            _apiKey = apiKey;

        /**
         * @method getApiKey
         * @return {String}
         */
        this.getApiKey = function() {
            return _apiKey;
        };

        /**
         * @method fetch
         * @param {String} method
         * @param {Object} parameters
         * @param {Object} [availableParameters]
         * @return {promise}
         */
        this.fetch = function() {
            // TODO
        };

    }

    /**
     * @static
     * @method extend
     * @param {Object} [prototypeProperties]
     * @param {Object} [staticProperties]
     * @return {EdmundsApi}
     */
    EdmundsApi.extend = function(prototypeProperties, staticProperties) {
        var Parent = this,
            Child, Surrogate;

        Child = function() {
            return Parent.apply(this, arguments);
        };

        // add static properties
        utils.extend(Child, Parent, staticProperties);

        // original noConflict method should not be added,
        // because it caches a global EdmundsApi variable
        if (Child.noConflict === EdmundsApi.noConflict) {
            delete Child.noConflict;
        }

        Surrogate = function() {
            this.constructor = Child;
        };

        Surrogate.prototype = Parent.prototype;
        Child.prototype = new Surrogate();

        // add instance properties
        utils.extend(Child.prototype, prototypeProperties);

        return Child;
    };

    /**
     * @method noConflict
     * @return {EdmundsApi}
     */
    EdmundsApi.noConflict = (function(previousEdmundsApi) {
        return function() {
            exports.EdmundsApi = previousEdmundsApi;
            return this;
        };
    }(exports.EdmundsApi));

    return EdmundsApi;

});
