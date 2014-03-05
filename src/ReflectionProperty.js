var ReflectionProperty = function (name, value) {

    if (arguments.length !== 2) {
        throw new SyntaxError('You must specify property name and value');
    }

    this.value = value;
    this.name = name;
    this.classOwner = null;
    this.objectOwner = null;

};
ReflectionProperty.prototype = Object.create(Object.prototype, {

    /**
     * Return the property value
     *
     * @return {mixed}
     */

    getValue: {
        value: function () {

            return this.value;

        }
    },

    /**
     * Return the property name
     *
     * @return {String}
     */

    getName: {
        value: function () {

            return this.name;

        }
    },

    /**
     * Set the object this property is taken from
     *
     * @param {ReflectionObject} reflection
     *
     * @return {ReflectionProperty}
     */

    setObject: {
        value: function (reflection) {

            if (!(reflection instanceof ReflectionObject)) {
                throw new TypeError('Invalid object');
            }

            if (!reflection.hasProperty(this.getName())) {
                throw new ReferenceError('The object does not own this property');
            }

            this.objectOwner = reflection;

            return this;

        }
    },

    /**
     * Return the object the property is taken from
     *
     * @return {ReflectionObject}
     */

    getObject: {
        value: function () {

            return this.objectOwner;

        }
    },

    /**
     * Set the class this property is taken from
     *
     * @param {ReflectionClass} reflection
     *
     * @return {ReflectionProperty}
     */

    setClass: {
        value: function (reflection) {

            if (!(reflection instanceof ReflectionClass)) {
                throw new TypeError('Invalid class');
            }

            if (!reflection.hasProperty(this.getName())) {
                throw new ReferenceError('The class does not own this property');
            }

            this.classOwner = reflection;

            return this;

        }
    },

    /**
     * Return the class this property is taken from
     *
     * @return {ReflectionClass}
     */

    getClass: {
        value: function () {

            return this.classOwner;

        }
    }

});
