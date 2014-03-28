define(['./utils', 'exports'], function(utils, exports) {

    /**
     * @class EdmundsApi
     * @param {Object} options
     *     @param {String} options.apiKey
     *     @param {Number} options.timeout
     * @constructor
     */
    function EdmundsApi(options) {
        var availableOptions = ['apiKey', 'timeout'];
        utils.extend(this, utils.pick(options || {}, availableOptions));
    }

    // static properties
    utils.extend(EdmundsApi, {

        /**
         * @static
         * @property BASE_URL
         * @type {String}
         */
        BASE_URL: (location && location.protocol === 'https:' ? 'https:' : 'http:') + '//api.edmunds.com',

        /**
         * @static
         * @method extend
         * @param {Object} [prototypeProperties]
         * @param {Object} [staticProperties]
         * @return {EdmundsApi}
         */
        extend: function(prototypeProperties, staticProperties) {
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
        },

        /**
         * @static
         * @method noConflict
         * @return {EdmundsApi}
         */
        noConflict: (function(previousEdmundsApi) {
            return function() {
                exports.EdmundsApi = previousEdmundsApi;
                return this;
            };
        }(exports.EdmundsApi))

    });

    // instance properties
    utils.extend(EdmundsApi.prototype, {

        /**
         * @property apiKey
         * @type {String}
         */

        /**
         * @property timeout
         * @type {Number}
         * @default 5000
         */
        timeout: 5000,

        /**
         * @method buildRequestUrl
         * @param method
         * @return {String}
         */
        buildRequestUrl: function(method) {
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
            return EdmundsApi.BASE_URL + method;
        },

        /**
         * @method filterRequestParameters
         * @param {Object} parameters
         * @param {Array} availableParameters
         * @return {Object}
         */
        filterRequestParameters: function(parameters, availableParameters) {
            parameters = utils.pick(parameters, availableParameters);
            return utils.extend({}, parameters, { fmt: 'json' }); // force json format
        },

        /**
         * @method fetch
         * @param {String} method
         * @param {Object} parameters
         * @param {Array} [availableParameters]
         * @return {promise}
         */
        fetch: function() {
            // TODO
        }

    });

    return EdmundsApi;

});
