/**
 * @venus-library jasmine
 * @venus-include ../src/ReflectionObject.js
 * @venus-include ../src/ReflectionProperty.js
 * @venus-include ../src/ReflectionMethod.js
 * @venus-include ../src/ReflectionConstant.js
 */

describe('ReflectionObject', function () {

    var Mock = function () {
            this.property = null;
        },
        object;

    Mock.prototype = Object.create(Object.prototype, {
        CONSTANT: {
            value: 42
        },

        method: {
            value: function (arg) {}
        }
    });

    beforeEach(function () {
        object = new Mock();
    });

    it('should throw if not an object passed to the constructor', function () {
        expect(function () {
            new ReflectionObject(function () {});
        }).toThrow('You must pass an object as argument');
    });

    it('should return the list of properties', function () {
        var refl = new ReflectionObject(object),
            props = refl.getProperties();

        expect(props instanceof Array).toBe(true);
        expect(props.length).toEqual(1);
        expect(props[0] instanceof ReflectionProperty).toBe(true);
    });

    it('should throw if trying to get unknown property', function () {
        var refl = new ReflectionObject(object);

        expect(function () {
            refl.getProperty('unknown');
        }).toThrow('Unknown property');
    });

    it('should return a ReflectionProperty object', function () {
        var refl = new ReflectionObject(object),
            prop = refl.getProperty('property');

        expect(prop instanceof ReflectionProperty).toBe(true);
    });

    it('should say that the property exist', function () {
        var refl = new ReflectionObject(object);

        expect(refl.hasProperty('property')).toBe(true);
    });

    it('should say that the property does not exist', function () {
        var refl = new ReflectionObject(object);

        expect(refl.hasProperty('unknown')).toBe(false);
    });

    it('should throw if trying to get unknown method', function () {
        var refl = new ReflectionObject(object);

        expect(function () {
            refl.getMethod('unknown');
        }).toThrow(new ReferenceError());
    });

    it('should return a ReflectionMethod object', function () {
        var refl = new ReflectionObject(object),
            method = refl.getMethod('method');

        expect(method instanceof ReflectionMethod).toBe(true);
    });

    it('should say that the method exist', function () {
        var refl = new ReflectionObject(object);

        expect(refl.hasMethod('method')).toBe(true);
    });

    it('should say that the method does not exist', function () {
        var refl = new ReflectionObject(object);

        expect(refl.hasMethod('unknown')).toBe(false);
    });

    it('should throw if trying to get unknown constant', function () {
        var refl = new ReflectionObject(object);

        expect(function () {
            refl.getConstant('unknown');
        }).toThrow(new ReferenceError());
    });

    it('should return a ReflectionConstant object', function () {
        var refl = new ReflectionObject(object),
            constant = refl.getConstant('CONSTANT');

        expect(constant instanceof ReflectionConstant).toBe(true);
    });

    it('should say that the constant exist', function () {
        var refl = new ReflectionObject(object);

        expect(refl.hasConstant('CONSTANT')).toBe(true);
    });

    it('should say that the constant does not exist', function () {
        var refl = new ReflectionObject(object);

        expect(refl.hasConstant('unknown')).toBe(false);
    });

    it('should freeze the object', function () {
        var refl = new ReflectionObject(object);

        refl.freeze();

        expect(Object.isFrozen(object)).toBe(true);
    });

    it('should say that the object is frozen', function () {
        var refl = new ReflectionObject(object);

        refl.freeze();

        expect(refl.isFrozen()).toBe(true);
    });

    it('should say that the object is not frozen', function () {
        var refl = new ReflectionObject(object);

        expect(refl.isFrozen()).toBe(false);
    });

    it('should seal the object', function () {
        var refl = new ReflectionObject(object);

        refl.seal();

        expect(Object.isSealed(object)).toBe(true);
    });

    it('should say that the object is sealed', function () {
        var refl = new ReflectionObject(object);

        refl.seal();

        expect(refl.isSealed()).toBe(true);
    });

    it('should say that the object is not sealed', function () {
        var refl = new ReflectionObject(object);

        expect(refl.isSealed()).toBe(false);
    });

});