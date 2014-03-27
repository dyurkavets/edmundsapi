define(['utils'], function(utils) {

    describe('utils.argsToArray', function() {

        it('should convert an arguments into an array', function() {
            (function() {
                expect(utils.argsToArray(arguments)).toEqual(['foo', 'bar']);
            }('foo', 'bar'));
        });

    });

    describe('utils.extend', function() {

        it('should extend an object with attributes of another', function() {
            var result = utils.extend({}, { foo: 'foo' });
            expect(result.foo).toBe('foo');
        });

        it('should override properties in destination object', function() {
            var result = utils.extend({ foo: 'foo', 'bar': 'bar' }, { foo: 'bar' });
            expect(result.foo).toBe('bar');
            expect(result.bar).toBe('bar');
        });

        it('should extend from multiple source objects', function() {
            var result = utils.extend({ foo: 'foo' }, { bar: 'bar' }, { baz: 'baz' });
            expect(result).toEqual({ foo: 'foo', bar: 'bar', baz: 'baz' });
        });

        it('the last source will override properties of the same name in previous arguments', function() {
            var result = utils.extend({ foo: 'foo' }, { foo: 'bar'}, { foo: 'baz' });
            expect(result.foo).toBe('baz');
        });

    });

    describe('utils.forEach', function() {

        it('should provide value, index and array for each callback', function() {
            var numbers = [1, 2, 3];
            utils.forEach(numbers, function(number, index, list) {
                expect(number).toBe(index + 1);
                expect(list).toBe(numbers);
            });
        });

        it('should use a third parameter as this when executing callback', function() {
            var object = { result: 0 };
            utils.forEach([7, 11, 27], function(number, index) {
                this.result += number - index;
            }, object);
            expect(object.result).toBe(42);
        });

    });

    describe('utils.isFunction', function() {

        var isFunction = utils.isFunction;

        it('checks that false values return false', function() {
            expect(isFunction()).toBeFalsy();
            expect(isFunction(undefined)).toBeFalsy();
            expect(isFunction(null)).toBeFalsy();
            expect(isFunction('')).toBeFalsy();
            expect(isFunction(0)).toBeFalsy();
            expect(isFunction(false)).toBeFalsy();
        });

        it('checks different values', function() {
            expect(isFunction('function')).toBeFalsy();
            expect(isFunction(['function'])).toBeFalsy();
            expect(isFunction({ 'function': 'name' })).toBeFalsy();
            expect(isFunction(isFunction)).toBeTruthy();
        });

    });

});