/**
 * @venus-library jasmine
 * @venus-include ../src/ReflectionProperty.js
 * @venus-include ../src/ReflectionClass.js
 * @venus-include ../src/ReflectionObject.js
 */

describe('ReflectionProperty', function () {

    var Mock = function () {
            this.property = null;
        };

    it('should throw if no arguments passed to the constructor', function () {
        expect(function () {
            new ReflectionProperty();
        }).toThrow('You must specify property name and value');
    });

    it('should set the property value', function () {
        var refl = new ReflectionProperty('property', 42);

        expect(refl.getValue()).toEqual(42);
    });

    it('should set the property name', function () {
        var refl = new ReflectionProperty('property', null);

        expect(refl.getName()).toEqual('property');
    });

    it('should set the object owning the property', function () {
        var object = new Mock(),
            reflObj = new ReflectionObject(object),
            refl = new ReflectionProperty('property', object.property);

        refl.setObject(reflObj);

        expect(refl.getObject()).toEqual(reflObj);
    });

    it('should throw trying to set invalid object', function () {
        var refl = new ReflectionProperty('property', null);

        expect(function () {
            refl.setObject(function () {});
        }).toThrow('Invalid object');
    });

    it('should throw if trying to set an object not owning the property', function () {
        var refl = new ReflectionProperty('property', null),
            reflObj = new ReflectionObject({});

        expect(function () {
            refl.setObject(reflObj);
        }).toThrow('The object does not own this property');
    });

    it('should set the class owning the property', function () {
        var refl = new ReflectionProperty('property', null),
            reflClass = new ReflectionClass(Mock);

        refl.setClass(reflClass);

        expect(refl.getClass() instanceof ReflectionClass).toBe(true);
    });

    it('should throw if trying to set invalid class', function () {
        var refl = new ReflectionProperty('property', null);

        expect(function () {
            refl.setClass({});
        }).toThrow('Invalid class');
    });

    it('should throw if trying to set a class not owning the property', function () {
        var refl = new ReflectionProperty('property', null),
            reflClass = new ReflectionClass(function () {});

        expect(function () {
            refl.setClass(reflClass);
        }).toThrow('The class does not own this property');
    });

    it('should set the value in the object property', function () {
        var obj = new Mock(),
            reflObj = new ReflectionObject(obj),
            refl = new ReflectionProperty('property', null);

        refl.setObject(reflObj);
        refl.setValue('foo');

        expect(obj.property).toEqual('foo');
    });

    it('should throw if trying to set value in wrong context', function () {
        var refl = new ReflectionProperty('property', null);

        expect(function () {
            refl.setValue('foo');
        }).toThrow('Can call the method only if reflected from an object');

        refl.setClass(new ReflectionClass(Mock));

        expect(function () {
            refl.setValue('foo');
        }).toThrow('Can call the method only if reflected from an object');
    });

});