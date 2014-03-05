/**
 * @venus-library jasmine
 * @venus-include ../src/ReflectionMethod.js
 * @venus-include ../src/ReflectionClass.js
 * @venus-include ../src/ReflectionObject.js
 */

describe('ReflectionMethod', function () {

    var Mock = function () {
            this.property = null;
        };

    Mock.prototype = Object.create(Object.prototype, {
        method: {
            value: function (arg) {
                return 'called ' + (arg || 'with no argument');
            }
        }
    });

    it('should set the method body', function () {
        var refl = new ReflectionMethod('method', Mock.prototype.method);

        expect(refl.getPrototype()).toEqual(Mock.prototype.method);
    });

    it('should set the method name', function () {
        var refl = new ReflectionMethod('method', Mock.prototype.method);

        expect(refl.getName()).toEqual('method');
    });

    it('should set the object owning the method', function () {
        var object = new Mock(),
            reflObj = new ReflectionObject(object),
            refl = new ReflectionMethod('method', object.method);

        refl.setObject(reflObj);

        expect(refl.getObject()).toEqual(reflObj);
    });

    it('should throw trying to set invalid object', function () {
        var object = new Mock(),
            refl = new ReflectionMethod('method', object.method);

        expect(function () {
            refl.setObject(function () {});
        }).toThrow('Invalid object');
    });

    it('should throw if trying to set an object not owning the method', function () {
        var object = new Mock(),
            refl = new ReflectionMethod('method', object.method),
            reflObj = new ReflectionObject({});

        expect(function () {
            refl.setObject(reflObj);
        }).toThrow('The object does not own this method');
    });

    it('should set the class owning the method', function () {
        var refl = new ReflectionMethod('method', Mock.prototype.method),
            reflClass = new ReflectionClass(Mock);

        refl.setClass(reflClass);

        expect(refl.getClass() instanceof ReflectionClass).toBe(true);
    });

    it('should throw if trying to set invalid class', function () {
        var refl = new ReflectionMethod('method', Mock.prototype.method);

        expect(function () {
            refl.setClass({});
        }).toThrow('Invalid class');
    });

    it('should throw if trying to set a class not owning the method', function () {
        var refl = new ReflectionMethod('method', Mock.prototype.method),
            reflClass = new ReflectionClass(function () {});

        expect(function () {
            refl.setClass(reflClass);
        }).toThrow('The class does not own this method');
    });

    it('should call the method', function () {
        var object = new Mock(),
            reflObj = new ReflectionObject(object),
            refl = new ReflectionMethod('method', object.method);

        refl.setObject(reflObj);

        expect(refl.call()).toEqual('called with no argument');
        expect(refl.call('foo')).toEqual('called foo');
    });

    it('should throw if trying to call not in the context its taken from an object', function () {
        var refl = new ReflectionMethod('method', Mock.prototype.method),
            reflClass = new ReflectionClass(Mock);

        refl.setClass(reflClass);

        expect(function () {
            refl.call();
        }).toThrow('Can call the method only if reflected from an object');
    });

    it('should return the appropriate context', function () {
        var refl = new ReflectionMethod('method', null),
            obj = new ReflectionObject(new Mock()),
            klass = new ReflectionClass(Mock);

        expect(refl.getContext()).toEqual('unknown');

        refl.setObject(obj);

        expect(refl.getContext()).toEqual('object');

        refl.objectOwner = null;
        refl.setClass(klass);

        expect(refl.getContext()).toEqual('class');
    });

});