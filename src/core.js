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
             * @attribute _apiKey
             * @type {String}
             */
            _apiKey = apiKey,

            /**
             * @private
             * @attribute _protocol
             * @type {String}
             */
            _protocol = location && location.protocol === 'https:' ? 'https:' : 'http:',

            /**
             * @private
             * @attribute _baseUrl
             * @type {String}
             */
            _baseUrl = _protocol + '//api.edmunds.com';

        /**
         * @method getApiKey
         * @return {String}
         */
        this.getApiKey = function() {
            return _apiKey;
        };

        /**
         * @method getBaseUrl
         * @return {String}
         */
        this.getBaseUrl = function() {
            return _baseUrl;
        };

        /**
         * @method buildRequestUrl
         * @param method
         * @return {String}
         */
        this.buildRequestUrl = function(method) {
            if (typeof method !== 'string') {
                method = '';
            }
            // discard query parameters
            if (method.indexOf('?') > -1) {
                method = method.split('?')[0];
            }
            // add leading slash if not exist
            if (method.indexOf('/') !== 0) {
                method = '/' + method;
            }
            // add '/api' prefix if not exist
            if (method.indexOf('/api/') !== 0) {
                method = '/api' + method;
            }
            return _baseUrl + method;
        };

        /**
         * @method filterRequestParameters
         * @param {Object} parameters
         * @param {Array} availableParameters
         * @return {Object}
         */
        this.filterRequestParameters = function(parameters, availableParameters) {
            parameters = utils.pick(parameters, availableParameters);
            return utils.extend({}, parameters, { fmt: 'json' }); // force json format
        };

        /**
         * @method fetch
         * @param {String} method
         * @param {Object} parameters
         * @param {Array} [availableParameters]
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
