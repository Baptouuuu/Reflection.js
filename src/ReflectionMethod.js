var ReflectionMethod = function (name, methodPrototype) {

    if (!name || !methodPrototype) {
        throw new SyntaxError('You must specify method name and prototype');
    }

    this.methodPrototype = methodPrototype;
    this.name = name;
    this.classOwner = null;
    this.objectOwner = null;

};
ReflectionMethod.prototype = Object.create(Object.prototype, {

    /**
     * Return the method body
     *
     * @return {Function}
     */

    getPrototype: {
        value: function () {

            return this.methodPrototype;

        }
    },

    /**
     * Return the method name
     *
     * @return {String}
     */

    getName: {
        value: function () {

            return this.name;

        }
    },

    /**
     * Set the object this method is taken from
     *
     * @param {Object} object
     *
     * @return {ReflectionMethod}
     */

    setObject: {
        value: function (object) {}
    },

    /**
     * Return the object the method is taken from
     *
     * @return {Object}
     */

    getObject: {
        value: function () {}
    },

    /**
     * Set the class this method is taken from
     *
     * @param {Function} classOwner
     *
     * @return {ReflectionMethod}
     */

    setClass: {
        value: function (classOwner) {}
    },

    /**
     * Return the class this method is taken from
     *
     * @return {Function}
     */

    getClass: {
        value: function () {}
    },

    /**
     * Call the method with the object as context
     *
     * All arguments passed to this function is applied on the method
     *
     * @return {mixed}
     */

    call: {
        value: function () {}
    }

});
