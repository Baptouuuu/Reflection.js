var ReflectionConstant = function () {

    this.value = null;
    this.name = null;
    this.objectOwner = null;
    this.classOwner = null;

};
ReflectionConstant.prototype = Object.create(Object.prototype, {

    /**
     * Set the property value
     *
     * @param {mixed} value
     *
     * @return {ReflectionConstant}
     */

    setValue: {
        value: function (value) {}
    },

    /**
     * Return the property value
     *
     * @return {mixed}
     */

    getValue: {
        value: function () {}
    },

    /**
     * Set the property name
     *
     * @param {String} name
     *
     * @return {ReflectionConstant}
     */

    setName: {
        value: function (name) {}
    },

    /**
     * Return the property name
     *
     * @return {String}
     */

    getName: {
        value: function () {}
    },

    /**
     * Set the object this property is taken from
     *
     * @param {Object} object
     *
     * @return {ReflectionConstant}
     */

    setObject: {
        value: function (object) {}
    },

    /**
     * Return the object the property is taken from
     *
     * @return {Object}
     */

    getObject: {
        value: function () {}
    },

    /**
     * Set the class this property is taken from
     *
     * @param {Function} classOwner
     *
     * @return {ReflectionConstant}
     */

    setClass: {
        value: function (classOwner) {}
    },

    /**
     * Return the class this property is taken from
     *
     * @return {Function}
     */

    getClass: {
        value: function () {}
    },

    /**
     * Check if the constant is writable
     *
     * @return {Boolean}
     */

    isWritable: {
        value: function () {}
    },

    /**
     * Check if the constant is configurable
     *
     * @return {Boolean}
     */

    isConfigurable: {
        value: function () {}
    },

    /**
     * Check if the constant is enumerable
     *
     * @return {Boolean}
     */

    isEnumerable: {
        value: function () {}
    }

});
