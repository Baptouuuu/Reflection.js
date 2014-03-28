/**
 * @venus-library jasmine
 * @venus-include ../src/ReflectionClass.js
 * @venus-include ../src/ReflectionMethod.js
 * @venus-include ../src/ReflectionConstant.js
 * @venus-include ../src/ReflectionProperty.js
 */

describe('ReflectionClass', function () {

    var Mock = function () {
            this.property = null;
        };

    Mock.prototype = Object.create(Object.prototype, {
        CONSTANT: {
            value: 42
        },

        method: {
            value: function (arg) {}
        }
    });

    it('should throw if not a function passed to the constructor', function () {
        expect(function () {
            new ReflectionClass({});
        }).toThrow('You must pass a function as argument');
    });

    it('should return the list of properties', function () {
        var refl = new ReflectionClass(Mock),
            props = refl.getProperties();

        expect(props instanceof Array).toBe(true);
        expect(props.length).toEqual(1);
        expect(props[0] instanceof ReflectionProperty).toBe(true);
    });

    it('should return a ReflectionProperty object', function () {
        var refl = new ReflectionClass(Mock),
            prop = refl.getProperty('property');

        expect(prop instanceof ReflectionProperty).toBe(true);
    });

    it('should throw if trying to get unknown property', function () {
        var refl = new ReflectionClass(Mock);

        expect(function () {
            refl.getProperty('unknown');
        }).toThrow('Unknown property');
    });

    it('should say that the class has the property', function () {
        var refl = new ReflectionClass(Mock);

        expect(refl.hasProperty('property')).toBe(true);
    });

    it('should say that the class does not have the property', function () {
        var refl = new ReflectionClass(Mock);

        expect(refl.hasProperty('unknown')).toBe(false);
    });

    it('should throw if trying to get unknown method', function () {
        var refl = new ReflectionClass(Mock);

        expect(function () {
            refl.getMethod('unknown');
        }).toThrow('Unknown method');
    });

    it('should return a ReflectionMethod object', function () {
        var refl = new ReflectionClass(Mock),
            method = refl.getMethod('method');

        expect(method instanceof ReflectionMethod).toBe(true);
    });

    it('should say that the method exist', function () {
        var refl = new ReflectionClass(Mock);

        expect(refl.hasMethod('method')).toBe(true);
    });

    it('should say that the method does not exist', function () {
        var refl = new ReflectionClass(Mock);

        expect(refl.hasMethod('unknown')).toBe(false);
    });

    it('should throw if trying to get unknown constant', function () {
        var refl = new ReflectionClass(Mock);

        expect(function () {
            refl.getConstant('unknown');
        }).toThrow('Unknown constant');
    });

    it('should return a ReflectionConstant object', function () {
        var refl = new ReflectionClass(Mock),
            constant = refl.getConstant('CONSTANT');

        expect(constant instanceof ReflectionConstant).toBe(true);
    });

    it('should say that the constant exist', function () {
        var refl = new ReflectionClass(Mock);

        expect(refl.hasConstant('CONSTANT')).toBe(true);
    });

    it('should say that the constant does not exist', function () {
        var refl = new ReflectionClass(Mock);

        expect(refl.hasConstant('unknown')).toBe(false);
    });

    it('should create a new instance of the class', function () {
        var refl = new ReflectionClass(Mock);

        expect(refl.create() instanceof Mock).toBe(true);
    });

    it('should return the prototype', function () {
        var refl = new ReflectionClass(Mock);

        expect(refl.getPrototype()).toEqual(Mock.prototype);
    });

});