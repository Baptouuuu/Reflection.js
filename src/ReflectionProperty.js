var ReflectionProperty = function () {

    this.value = null;
    this.name = null;
    this.classOwner = null;
    this.objectOwner = null;

};
ReflectionProperty.prototype = Object.create(Object.prototype, {

    /**
     * Set the property value
     *
     * @param {mixed} value
     *
     * @return {ReflectionProperty}
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
     * @return {ReflectionProperty}
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
     * @return {ReflectionProperty}
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
     * @return {ReflectionProperty}
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
    }

});
