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

    PROPERTY_PATTERN: {
        value: '^this\\.([\\w_]+)\\s?=.*$'
    },

    /**
     * Get class definition
     *
     * @return {Function}
     */

    getClass: {
        value: function () {
            return this.definition;
        }
    },

    /**
     * Return the list of properties set in the object
     *
     * @return {Array}
     */

    getProperties: {
        value: function () {

            var properties = [],
                lines = this.definition.toString().split('\n'),
                re = new RegExp(this.PROPERTY_PATTERN, 'i'),
                results,
                refl;

            for (var line in lines) {
                line = lines[line].trim();
                results = re.exec(line);

                if (results && results.length >= 2) {
                    //`null` as i can't determine the type of the property via regular expression
                    refl = new ReflectionProperty(results[1], null);
                    refl.setClass(this);

                    properties.push(refl);
                }
            }

            return properties;

        }
    },

    /**
     * Return the reflection object for the specified property
     *
     * @param {String} property
     *
     * @return {ReflectionProperty}
     */

    getProperty: {
        value: function (property) {

            if (!this.hasProperty(property)) {
                throw new ReferenceError('Unknown property');
            }

            var refl = new ReflectionProperty(property, null);

            refl.setClass(this);

            return refl;

        }
    },

    /**
     * Check if the object has the property
     *
     * @param {String} property
     *
     * @return {Boolean}
     */

    hasProperty: {
        value: function (property) {

            var lines = this.definition.toString().split('\n'),
                re = new RegExp(this.PROPERTY_PATTERN, 'i'),
                results;

            for (var line in lines) {
                line = lines[line].trim();
                results = re.exec(line);

                if (results && results.length >= 2 && results[1] === property) {
                    return true;
                }
            }

            return false;

        }
    },

    /**
     * Return the reflection object for the specified function
     *
     * @param {String} method
     *
     * @return {ReflectionMethod}
     */

    getMethod: {
        value: function (method) {

            if (!this.hasMethod(method)) {
                throw new ReferenceError('Unknown method');
            }

            var refl = new ReflectionMethod(method, this.definition.prototype[method]);

            refl.setClass(this);

            return refl;

        }
    },

    /**
     * Check if the object has the specified method
     *
     * @param {String} method
     *
     * @return {Boolean}
     */

    hasMethod: {
        value: function (method) {

            if (
                this.definition.prototype.hasOwnProperty(method) &&
                typeof this.definition.prototype[method] === 'function'
            ) {
                return true;
            }

            return false;

        }
    },

    /**
     * Return the value for the specified constant
     *
     * @param {String} constant
     *
     * @return {ReflectionConstant}
     */

    getConstant: {
        value: function (constant) {

            if (!this.hasConstant(constant)) {
                throw new ReferenceError('Unknown constant');
            }

            var refl = new ReflectionConstant(constant, this.definition.prototype[constant]);

            refl.setClass(this);

            return refl;

        }
    },

    /**
     * Check if the specified constant exist
     *
     * @param {String} constant
     *
     * @return {Boolean}
     */

    hasConstant: {
        value: function (constant) {

            if (
                this.definition.prototype[constant] !== undefined &&
                !this.hasMethod(constant)
            ) {
                return true;
            }

            return false;

        }
    },

    /**
     * Create a new instance of the class
     *
     * Unfortunately you can't pass arguments to this method
     *
     * @return {Object}
     */

    create: {
        value: function () {

            return new this.definition();

        }
    },

    /**
     * Return the prototype of the given class
     *
     * @return {Object}
     */

    getPrototype: {
        value: function () {

            return this.definition.prototype;

        }
    }

});
