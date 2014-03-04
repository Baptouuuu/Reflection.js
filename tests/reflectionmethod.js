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
        var refl = new ReflectionMethod();

        refl.setPrototype(Mock.prototype.method);

        expect(refl.getPrototype()).toEqual(Mock.prototype.method);
    });

    it('should set the method name', function () {
        var refl = new ReflectionMethod();

        refl.setName('method');

        expect(refl.getName()).toEqual('method');
    });

    it('should set the object owning the method', function () {
        var refl = new ReflectionMethod(),
            object = new Mock(),
            reflObj = new ReflectionObject(object);

        refl.setObject(reflObj);

        expect(refl.getObject()).toEqual(reflObj);
    });

    it('should throw trying to set invalid object', function () {
        var refl = new ReflectionMethod();

        expect(function () {
            refl.setObject(function () {});
        }).toThrow(new TypeError());
    });

    it('should throw if trying to set an object not owning the method', function () {
        var refl = new ReflectionMethod(),
            reflObj = new ReflectionObject({});

        expect(function () {
            refl.setObject(reflObj);
        }).toThrow(new ReferenceError());
    });

    it('should set the class owning the method', function () {
        var refl = new ReflectionMethod(),
            reflClass = new ReflectionClass(Mock);

        refl.setClass(reflClass);

        expect(refl.getClass() instanceof Mock).toBe(true);
    });

    it('should throw if trying to set invalid class', function () {
        var refl = new ReflectionMethod();

        expect(function () {
            refl.setClass({});
        }).toThrow(new TypeError());
    });

    it('should throw if trying to set a class not owning the method', function () {
        var refl = new ReflectionMethod(),
            reflClass = new ReflectionClass(function () {});

        expect(function () {
            refl.setClass(reflClass);
        }).toThrow(new ReferenceError());
    });

    it('should call the method', function () {
        var refl = new ReflectionMethod(),
            object = new Mock(),
            reflObj = new ReflectionObject(object);

        refl.setPrototype(object.method);
        refl.setName('method');
        refl.setObject(reflObj);

        expect(refl.call()).toEqual('called with no argument');
        expect(refl.call('foo')).toEqual('called foo');
    });

    it('should throw if trying to call not in the context its taken from an object', function () {
        var refl = new ReflectionMethod(),
            reflClass = new ReflectionClass(Mock);

        refl.setPrototype(Mock.prototype.method);
        refl.setName('method');
        refl.setClass(reflClass);

        expect(function () {
            refl.call();
        }).toThrow(new SyntaxError());
    });

});