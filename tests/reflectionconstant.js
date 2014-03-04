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
        var refl = new ReflectionConstant();

        refl.setValue(Mock.prototype.CONSTANT);

        expect(refl.getValue()).toEqual(42);
    });

    it('should set the constant name', function () {
        var refl = new ReflectionConstant();

        refl.setName('CONSTANT');

        expect(refl.getName()).toEqual('CONSTANT');
    });

    it('should set the object owning the constant', function () {
        var refl = new ReflectionConstant(),
            object = new Mock(),
            reflObj = new ReflectionObject(object);

        refl.setObject(reflObj);

        expect(refl.getObject()).toEqual(reflObj);
    });

    it('should throw trying to set invalid object', function () {
        var refl = new ReflectionConstant();

        expect(function () {
            refl.setObject(function () {});
        }).toThrow(new TypeError());
    });

    it('should throw if trying to set an object not owning the constant', function () {
        var refl = new ReflectionConstant(),
            reflObj = new ReflectionObject({});

        expect(function () {
            refl.setObject(reflObj);
        }).toThrow(new ReferenceError());
    });

    it('should set the class owning the constant', function () {
        var refl = new ReflectionConstant(),
            reflClass = new ReflectionClass(Mock);

        refl.setClass(reflClass);

        expect(refl.getClass() instanceof Mock).toBe(true);
    });

    it('should throw if trying to set invalid class', function () {
        var refl = new ReflectionConstant();

        expect(function () {
            refl.setClass({});
        }).toThrow(new TypeError());
    });

    it('should throw if trying to set a class not owning the constant', function () {
        var refl = new ReflectionConstant(),
            reflClass = new ReflectionClass(function () {});

        expect(function () {
            refl.setClass(reflClass);
        }).toThrow(new ReferenceError());
    });

    it('should say that the constant is writable', function () {
        var refl = new ReflectionConstant(),
            reflObj = new ReflectionObject(new Mock());

        refl.setName('WRITABLE');
        refl.setObject(reflObj);

        expect(refl.isWritable()).toBe(true);
    });

    it('should say that the constant is not writable', function () {
        var refl = new ReflectionConstant(),
            reflObj = new ReflectionObject(new Mock());

        refl.setName('NOT_WRITABLE');
        refl.setObject(reflObj);

        expect(refl.isWritable()).toBe(false);
    });

    it('should throw if trying to know if writable not in the context of an object', function () {
        var refl = new ReflectionConstant();

        refl.setName('WRITABLE');

        expect(function () {
            refl.isWritable();
        }).toThrow(new SyntaxError());
    });

    it('should say that the constant is configurable', function () {
        var refl = new ReflectionConstant(),
            reflObj = new ReflectionObject(new Mock());

        refl.setName('CONFIGURABLE');
        refl.setObject(reflObj);

        expect(refl.isConfigurable()).toBe(true);
    });

    it('should say that the constant is not configurable', function () {
        var refl = new ReflectionConstant(),
            reflObj = new ReflectionObject(new Mock());

        refl.setName('NOT_CONFIGURABLE');
        refl.setObject(reflObj);

        expect(refl.isConfigurable()).toBe(false);
    });

    it('should throw if trying to know if configurable not in the context of an object', function () {
        var refl = new ReflectionConstant();

        refl.setName('CONFIGURABLE');

        expect(function () {
            refl.isConfigurable();
        }).toThrow(new SyntaxError());
    });

    it('should say that the constant is enumerable', function () {
        var refl = new ReflectionConstant(),
            reflObj = new ReflectionObject(new Mock());

        refl.setName('ENUMERABLE');
        refl.setObject(reflObj);

        expect(refl.isEnumerable()).toBe(true);
    });

    it('should say that the constant is not enumerable', function () {
        var refl = new ReflectionConstant(),
            reflObj = new ReflectionObject(new Mock());

        refl.setName('NOT_ENUMERABLE');
        refl.setObject(reflObj);

        expect(refl.isEnumerable()).toBe(false);
    });

    it('should throw if trying to know if enumerable not in the context of an object', function () {
        var refl = new ReflectionConstant();

        refl.setName('ENUMERABLE');

        expect(function () {
            refl.isEnumerable();
        }).toThrow(new SyntaxError());
    });

});