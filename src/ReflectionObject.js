var ReflectionObject = function (object) {

    if (this === window) {
        return new ReflectionObject(object);
    }

    if (typeof object !== 'object') {
        throw new TypeError('You must pass an object as argument');
    }

    this.object = object;

};
ReflectionObject.prototype = Object.create(Object.prototype, {

    /**
     * Return the list of properties set in the object
     *
     * @return {Array}
     */

    getProperties: {
        value: function () {}
    },

    /**
     * Return the reflection object for the specified property
     *
     * @param {String} property
     *
     * @return {ReflectionProperty}
     */

    getProperty: {
        value: function (property) {}
    },

    /**
     * Check if the object has the property
     *
     * @param {String} property
     *
     * @return {Boolean}
     */

    hasProperty: {
        value: function (property) {}
    },

    /**
     * Return the reflection object for the specified function
     *
     * @param {String} method
     *
     * @return {ReflectionMethod}
     */

    getMethod: {
        value: function (method) {}
    },

    /**
     * Check if the object has the specified method
     *
     * @param {String} method
     *
     * @return {Boolean}
     */

    hasMethod: {
        value: function (method) {}
    },

    /**
     * Return the value for the specified constant
     *
     * @param {String} constant
     *
     * @return {ReflectionConstant}
     */

    getConstant: {
        value: function (constant) {}
    },

    /**
     * Check if the specified constant exist
     *
     * @param {String} constant
     *
     * @return {Boolean}
     */

    hasConstant: {
        value: function (constant) {}
    },

    /**
     * Prevent the object from being changed, or new properties from being set
     *
     * @return {ReflectionObject}
     */

    freeze: {
        value: function () {}
    },

    /**
     * Check if the object is frozen
     *
     * @return {Boolean}
     */

    isFrozen: {
        value: function () {}
    },

    /**
     * Prevent new properties from being set on the object
     *
     * @return {ReflectionObject}
     */

    seal: {
        value: function () {}
    },

    /**
     * Check if the object is sealed
     *
     * @return {Boolean}
     */

    isSealed: {
        value: function () {}
    }

});
