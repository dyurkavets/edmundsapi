define(['./utils', './request', 'exports'], function(utils, request, exports) {

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
         *
         * @example
         * var VehicleApi = EdmundsApi.extend({
         *
         *   findMakes: function(parameters) {
         *     var method = this.buildMethod(),
         *         availableParameters = ['state', 'year', 'view'];
         *     return this.fetch(method, parameters, availableParameters);
         *   },
         *
         *   findNewMakes: function(parameters) {
         *     parameters = EdmundsApi.utils.extend({}, parameters, { state: 'new' });
         *     return this.findMakes(parameters);
         *   }
         *
         * });
         *
         * var vehicleApi = new VehicleApi('your_api_key');
         * vehicleApi.findNewMakes({ year: 2014 }).done(function(response) {
         *   console.log(response.makes);
         * });
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
        }(exports.EdmundsApi)),

        /**
         * @static
         * @property utils
         * @type {Object}
         */
        utils: utils

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
         * @method buildMethod
         * @param {String} [path]*
         * @return {String}
         *
         * @example
         * EdmundsApi.extend({
         *
         *   findMakeModelYearStyles: function(make, model, year, parameters) {
         *     var method = this.buildMethod('/api/vehicle/v2', 'bmw', '3-series', 2013, 'styles'),
         *         availableParameters = ['state', 'submodel', 'view', 'category'];
         *     return this.fetch(method, parameters, availableParameters);
         *   }
         *
         * });
         */
        buildMethod: function() {
            var paths = utils.toArray(arguments);
            return paths.join('/');
        },

        /**
         * @method filterRequestParameters
         * @param {Object} parameters
         * @param {Array} availableParameters
         * @return {Object}
         */
        filterRequestParameters: function(parameters, availableParameters) {
            parameters = utils.pick(parameters || {}, availableParameters);
            return utils.extend({}, parameters);
        },

        /**
         * @method fetch
         * @param {String} method
         * @param {Object} parameters
         * @param {Array} [availableParameters]
         * @return {promise}
         *
         * @example
         * var api = new EdmundsApi('your_api_key');
         * var request = api.fetch('/api/vehicle/v2/makes', { state: 'new' });
         *
         * request.done(function(response) {
         *   console.log(response.makes);
         * });
         *
         * request.fail(function(error) {
         *   console.log(error.message);
         * });
         *
         * request.always(function() {
         *   console.log('request has been completed');
         * });
         *
         */
        fetch: function(method, parameters, availableParameters) {
            parameters = this.filterRequestParameters(parameters, availableParameters);
            utils.extend(parameters, {
                fmt: 'json',
                'api_key': this.apiKey
            });
            return request.jsonp({
                url: this.buildRequestUrl(method),
                data: parameters,
                timeout: this.timeout
            });
        }

    });

    return EdmundsApi;

});
