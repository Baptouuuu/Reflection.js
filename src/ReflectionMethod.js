var ReflectionMethod = function (name, methodPrototype) {

    if (arguments.length !== 2) {
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
     * @param {ReflectionObject} reflection
     *
     * @return {ReflectionMethod}
     */

    setObject: {
        value: function (reflection) {

            if (!(reflection instanceof ReflectionObject)) {
                throw new TypeError('Invalid object');
            }

            if (!reflection.hasMethod(this.getName())) {
                throw new ReferenceError('The object does not own this method');
            }

            this.objectOwner = reflection;

            return this;

        }
    },

    /**
     * Return the object the method is taken from
     *
     * @return {ReflectionObject}
     */

    getObject: {
        value: function () {

            return this.objectOwner;

        }
    },

    /**
     * Set the class this method is taken from
     *
     * @param {ReflectionClass} reflection
     *
     * @return {ReflectionMethod}
     */

    setClass: {
        value: function (reflection) {

            if (!(reflection instanceof ReflectionClass)) {
                throw new TypeError('Invalid class');
            }

            if (!reflection.hasMethod(this.getName())) {
                throw new ReferenceError('The class does not own this method');
            }

            this.classOwner = reflection;

            return this;

        }
    },

    /**
     * Return the class this method is taken from
     *
     * @return {Function}
     */

    getClass: {
        value: function () {

            return this.classOwner;

        }
    },

    /**
     * Call the method with the object as context
     *
     * All arguments passed to this function is applied on the method
     *
     * @return {mixed}
     */

    call: {
        value: function () {

            if (this.classOwner !== null || !(this.objectOwner instanceof ReflectionObject)) {
                throw new SyntaxError('Can call the method only if reflected from an object');
            }

            return this.getPrototype().apply(this.objectOwner, arguments);

        }
    }

});
