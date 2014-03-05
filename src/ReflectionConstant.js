var ReflectionConstant = function (name, value) {

    if (arguments.length !== 2) {
        throw new SyntaxError('You must specify constant name and value');
    }

    this.value = value;
    this.name = name;
    this.objectOwner = null;
    this.classOwner = null;

};
ReflectionConstant.prototype = Object.create(Object.prototype, {

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
     * @return {ReflectionConstant}
     */

    setObject: {
        value: function (reflection) {

            if (!(reflection instanceof ReflectionObject)) {
                throw new TypeError('Invalid object');
            }

            if (!reflection.hasConstant(this.getName())) {
                throw new ReferenceError('The object does not own this constant');
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
     * @return {ReflectionConstant}
     */

    setClass: {
        value: function (reflection) {

            if (!(reflection instanceof ReflectionClass)) {
                throw new TypeError('Invalid class');
            }

            if (!reflection.hasConstant(this.getName())) {
                throw new ReferenceError('The class does not own this constant');
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
    },

    /**
     * Check if the constant is writable
     *
     * @return {Boolean}
     */

    isWritable: {
        value: function () {

            return this.getMeta('writable');

        }
    },

    /**
     * Check if the constant is configurable
     *
     * @return {Boolean}
     */

    isConfigurable: {
        value: function () {

            return this.getMeta('configurable');

        }
    },

    /**
     * Check if the constant is enumerable
     *
     * @return {Boolean}
     */

    isEnumerable: {
        value: function () {

            return this.getMeta('enumerable');

        }
    },

    /**
     * Get meta information on the constant
     *
     * @private
     * @param {String} key
     *
     * @return {mixed}
     */

    getMeta: {
        value: function (key) {

            if (!(this.classOwner instanceof ReflectionClass) || this.objectOwner !== null) {
                throw new SyntaxError('Can get information only if reflected from a class');
            }

            var meta = Object.getOwnPropertyDescriptor(this.classOwner.getClass().prototype, this.getName());

            return meta ? meta[key] : false;

        }
    }

});
