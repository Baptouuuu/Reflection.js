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

    it('should set the property value', function () {
        var refl = new ReflectionProperty(),
            object = new Mock();

        refl.setValue(object.property);

        expect(refl.getValue()).toEqual(object.property);
    });

    it('should set the property name', function () {
        var refl = new ReflectionProperty();

        refl.setName('property');

        expect(refl.getName()).toEqual('property');
    });

    it('should set the object owning the property', function () {
        var refl = new ReflectionProperty(),
            object = new Mock(),
            reflObj = new ReflectionObject(object);

        refl.setObject(reflObj);

        expect(refl.getObject()).toEqual(reflObj);
    });

    it('should throw trying to set invalid object', function () {
        var refl = new ReflectionProperty();

        expect(function () {
            refl.setObject(function () {});
        }).toThrow(new TypeError());
    });

    it('should throw if trying to set an object not owning the property', function () {
        var refl = new ReflectionProperty(),
            reflObj = new ReflectionObject({});

        expect(function () {
            refl.setObject(reflObj);
        }).toThrow(new ReferenceError());
    });

    it('should set the class owning the property', function () {
        var refl = new ReflectionProperty(),
            reflClass = new ReflectionClass(Mock);

        refl.setClass(reflClass);

        expect(refl.getClass() instanceof Mock).toBe(true);
    });

    it('should throw if trying to set invalid class', function () {
        var refl = new ReflectionProperty();

        expect(function () {
            refl.setClass({});
        }).toThrow(new TypeError());
    });

    it('should throw if trying to set a class not owning the property', function () {
        var refl = new ReflectionProperty(),
            reflClass = new ReflectionClass(function () {});

        expect(function () {
            refl.setClass(reflClass);
        }).toThrow(new ReferenceError());
    });

});