define(['core'], function(EdmundsApi) {

    var global = window;

    describe('EdmundsApi#getApiKey', function() {

        it('should return an API key', function() {
            var api = new EdmundsApi('foobar');
            expect(api.getApiKey()).toBe('foobar');
        });

    });

    describe('EdmundsApi#getBaseUrl', function() {

        var api = new EdmundsApi(),
            expectedProtocol = location.protocol === 'https:' ? 'https:' : 'http:',
            expectedUrl = expectedProtocol + '//api.edmunds.com';

        it('should return a base url', function() {
            var url = api.getBaseUrl();
            expect(url).toBe(expectedUrl);
        });

        it('should return a url with correct protocol', function() {
            var url = api.getBaseUrl();
            expect(url.indexOf(expectedProtocol)).toBe(0);
        });

    });

    describe('EdmundsApi#buildRequestUrl', function() {

        var api = new EdmundsApi(),
            expectedUrl = api.getBaseUrl() + '/api/foo/bar/baz';

        it('/api/foo/bar/baz', function() {
            var url = api.buildRequestUrl('/api/foo/bar/baz');
            expect(url).toBe(expectedUrl);
        });

        it('api/foo/bar/baz', function() {
            var url = api.buildRequestUrl('api/foo/bar/baz');
            expect(url).toBe(expectedUrl);
        });

        it('/foo/bar/baz', function() {
            var url = api.buildRequestUrl('/foo/bar/baz');
            expect(url).toBe(expectedUrl);
        });

        it('foo/bar/baz', function() {
            var url = api.buildRequestUrl('foo/bar/baz');
            expect(url).toBe(expectedUrl);
        });

        it('foo/bar/baz?query', function() {
            var url = api.buildRequestUrl('foo/bar/baz?query');
            expect(url).toBe(expectedUrl);
        });

    });

    describe('EdmundsApi#filterRequestParameters', function() {

        var api = new EdmundsApi();

        it('should return parameters for which keys are in whitelist', function() {
            var parameters = api.filterRequestParameters({ foo: 'foo', bar: 'bar' }, ['bar']);
            expect(parameters.foo).not.toBeDefined();
            expect(parameters.bar).toBe('bar');
        });

        it('should not override "fmt" parameter', function() {
            var parameters = api.filterRequestParameters({ fmt: 'foo' }, []);
            expect(parameters.fmt).toEqual('json');
        });
    });

    xdescribe('EdmundsApi#fetch', function() {

        // TODO

    });

    describe('EdmundsApi.extend', function() {

        beforeEach(function() {
            EdmundsApi.foo = 'foo';
            EdmundsApi.prototype.bar = 'bar';
        });

        afterEach(function() {
            delete EdmundsApi.foo;
            delete EdmundsApi.prototype.bar;
        });

        it('creates an instance of EdmundsApi', function() {
            var ExtendedApi = EdmundsApi.extend(),
                extendedApi = new ExtendedApi();
            expect(extendedApi instanceof EdmundsApi).toBeTruthy();
        });

        it('creates an instance of ExtendedApi', function() {
            var ExtendedApi = EdmundsApi.extend(),
                extendedApi = new ExtendedApi();
            expect(extendedApi instanceof ExtendedApi).toBeTruthy();
        });

        it('should inherit a static property', function() {
            var ExtendedApi = EdmundsApi.extend();
            expect(ExtendedApi.foo).toEqual('foo');
        });

        it('should override a static property', function() {
            var ExtendedApi = EdmundsApi.extend({}, { foo: 'bar' });
            expect(ExtendedApi.foo).toBe('bar');
        });

        it('should inherit a prototype property', function() {
            var ExtendedApi = EdmundsApi.extend();
            expect(ExtendedApi.prototype.bar).toBe('bar');
        });

        it('should override a prototype property', function() {
            var ExtendedApi = EdmundsApi.extend({ bar: 'foo' });
            expect(ExtendedApi.prototype.bar).toBe('foo');
        });

        it('should extend a prototype', function() {
            var ExtendedApi = EdmundsApi.extend({ baz: 'baz' });
            expect(ExtendedApi.prototype.baz).toBe('baz');
        });

        it('should not inherit noConflict method from core class', function() {
            var ExtendedApi = EdmundsApi.extend();
            expect(ExtendedApi.noConflict).not.toBeDefined();
        });

        it('should keep a custom noConflict method', function() {
            var ExtendedApi = EdmundsApi.extend({}, { noConflict: 'foo' });
            expect(ExtendedApi.noConflict).toBe('foo');
        });

    });

    describe('EdmundsApi.noConflict', function() {

        var globalEdmundsApi = global.EdmundsApi;

        beforeEach(function() {
            global.EdmundsApi = 'foo';
        });

        afterEach(function() {
            global.EdmundsApi = globalEdmundsApi;
        });

        it('should return the EdmundsApi', function() {
            expect(EdmundsApi.noConflict()).toBe(EdmundsApi);
        });

        it('should return previous global value', function() {
            EdmundsApi.noConflict();
            expect(global.EdmundsApi).toBe('foo');
        });

    });

});
