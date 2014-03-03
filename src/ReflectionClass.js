var ReflectionClass = function (definition) {

    if (this === window) {
        return new ReflectionClass(definition);
    }

    if (typeof definition !== 'function') {
        throw new TypeError('You must pass a function as argument');
    }

    this.definition = definition;

};
ReflectionClass.prototype = Object.create(Object.prototype, {

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
     * Return the list of methods set in the class
     *
     * @return {Array}
     */

    getMethods: {
        value: function () {}
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
     * Return the list of constants set in the class
     *
     * @return {Array}
     */

    getConstants: {
        value: function () {}
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
     * Create a new instance of the class
     *
     * @return {Object}
     */

    create: {
        value: function () {}
    }

});
