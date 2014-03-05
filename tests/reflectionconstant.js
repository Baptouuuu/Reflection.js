/**
 * @venus-library jasmine
 * @venus-include ../src/ReflectionConstant.js
 * @venus-include ../src/ReflectionClass.js
 * @venus-include ../src/ReflectionObject.js
 */

describe('ReflectionConstant', function () {

    var Mock = function () {
            this.property = null;
        };

    Mock.prototype = Object.create(Object.prototype, {
        CONSTANT: {
            value: 42
        },

        WRITABLE: {
            value: 42,
            writable: true
        },

        NOT_WRITABLE: {
            value: 42,
            writable: false
        },

        CONFIGURABLE: {
            value: 42,
            configurable: true
        },

        NOT_CONFIGURABLE: {
            value: 42,
            configurable: false
        },

        ENUMERABLE: {
            value: 42,
            enumerable: true
        },

        NOT_ENUMERABLE: {
            value: 42,
            enumerable: false
        },

        method: {
            value: function (arg) {}
        }
    });

    it('should set the constant value', function () {
        var refl = new ReflectionConstant('CONSTANT', Mock.prototype.CONSTANT);

        expect(refl.getValue()).toEqual(42);
    });

    it('should set the constant name', function () {
        var refl = new ReflectionConstant('CONSTANT', Mock.prototype.CONSTANT);

        expect(refl.getName()).toEqual('CONSTANT');
    });

    it('should set the object owning the constant', function () {
        var object = new Mock(),
            reflObj = new ReflectionObject(object),
            refl = new ReflectionConstant('CONSTANT', object.CONSTANT);

        refl.setObject(reflObj);

        expect(refl.getObject()).toEqual(reflObj);
    });

    it('should throw trying to set invalid object', function () {
        var object = new Mock(),
            refl = new ReflectionConstant('CONSTANT', object.CONSTANT);

        expect(function () {
            refl.setObject(function () {});
        }).toThrow('Invalid object');
    });

    it('should throw if trying to set an object not owning the constant', function () {
        var refl = new ReflectionConstant('CONSTANT', null),
            reflObj = new ReflectionObject({});

        expect(function () {
            refl.setObject(reflObj);
        }).toThrow('The object does not own this constant');
    });

    it('should set the class owning the constant', function () {
        var refl = new ReflectionConstant('CONSTANT', Mock.prototype.CONSTANT),
            reflClass = new ReflectionClass(Mock);

        refl.setClass(reflClass);

        expect(refl.getClass() instanceof ReflectionClass).toBe(true);
    });

    it('should throw if trying to set invalid class', function () {
        var refl = new ReflectionConstant('CONSTANT', Mock.prototype.CONSTANT);

        expect(function () {
            refl.setClass({});
        }).toThrow('Invalid class');
    });

    it('should throw if trying to set a class not owning the constant', function () {
        var refl = new ReflectionConstant('CONSTANT', Mock.prototype.CONSTANT),
            reflClass = new ReflectionClass(function () {});

        expect(function () {
            refl.setClass(reflClass);
        }).toThrow('The class does not own this constant');
    });

    it('should say that the constant is writable', function () {
        var refl = new ReflectionConstant('WRITABLE', Mock.prototype.WRITABLE),
            reflClass = new ReflectionClass(Mock);

        refl.setClass(reflClass);

        expect(refl.isWritable()).toBe(true);
    });

    it('should say that the constant is not writable', function () {
        var refl = new ReflectionConstant('NOT_WRITABLE', Mock.prototype.NOT_WRITABLE),
            reflClass = new ReflectionClass(Mock);

        refl.setClass(reflClass);

        expect(refl.isWritable()).toBe(false);
    });

    it('should throw if trying to know if writable not in the context of a class', function () {
        var refl = new ReflectionConstant('WRITABLE', Mock.prototype.WRITABLE);

        expect(function () {
            refl.isWritable();
        }).toThrow('Can get information only if reflected from a class');
    });

    it('should say that the constant is configurable', function () {
        var refl = new ReflectionConstant('CONFIGURABLE', Mock.prototype.CONFIGURABLE),
            reflClass = new ReflectionClass(Mock);

        refl.setClass(reflClass);

        expect(refl.isConfigurable()).toBe(true);
    });

    it('should say that the constant is not configurable', function () {
        var refl = new ReflectionConstant('NOT_CONFIGURABLE', Mock.prototype.NOT_CONFIGURABLE),
            reflClass = new ReflectionClass(Mock);

        refl.setClass(reflClass);

        expect(refl.isConfigurable()).toBe(false);
    });

    it('should throw if trying to know if configurable not in the context of a class', function () {
        var refl = new ReflectionConstant('CONFIGURABLE', Mock.prototype.CONFIGURABLE);

        expect(function () {
            refl.isConfigurable();
        }).toThrow('Can get information only if reflected from a class');
    });

    it('should say that the constant is enumerable', function () {
        var refl = new ReflectionConstant('ENUMERABLE', Mock.prototype.ENUMERABLE),
            reflClass = new ReflectionClass(Mock);

        refl.setClass(reflClass);

        expect(refl.isEnumerable()).toBe(true);
    });

    it('should say that the constant is not enumerable', function () {
        var refl = new ReflectionConstant('NOT_ENUMERABLE', Mock.prototype.NOT_ENUMERABLE),
            reflClass = new ReflectionClass(Mock);

        refl.setClass(reflClass);

        expect(refl.isEnumerable()).toBe(false);
    });

    it('should throw if trying to know if enumerable not in the context of a class', function () {
        var refl = new ReflectionConstant('ENUMERABLE', Mock.prototype.ENUMERABLE);


        expect(function () {
            refl.isEnumerable();
        }).toThrow('Can get information only if reflected from a class');
    });

});