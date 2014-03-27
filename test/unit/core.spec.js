define(['core'], function(EdmundsApi) {

    var global = window;

    describe('EdmundsApi#getApiKey', function() {

        it('should return an API key', function() {
            var api = new EdmundsApi('foobar');
            expect(api.getApiKey()).toBe('foobar');
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
