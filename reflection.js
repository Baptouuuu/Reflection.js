/*! Reflection.js#1.0.0 - 2014-03-08 */
var ReflectionClass = function(definition) {
    if (this === window) return new ReflectionClass(definition);
    if ("function" != typeof definition) throw new TypeError("You must pass a function as argument");
    this.definition = definition;
};

ReflectionClass.prototype = Object.create(Object.prototype, {
    PROPERTY_PATTERN: {
        value: "^this\\.([\\w_]+)\\s?=.*$"
    },
    getClass: {
        value: function() {
            return this.definition;
        }
    },
    getProperties: {
        value: function() {
            var results, refl, properties = [], lines = this.definition.toString().split("\n"), re = new RegExp(this.PROPERTY_PATTERN, "i");
            for (var line in lines) line = lines[line].trim(), results = re.exec(line), results && results.length >= 2 && (refl = new ReflectionProperty(results[1], null), 
            refl.setClass(this), properties.push(refl));
            return properties;
        }
    },
    getProperty: {
        value: function(property) {
            if (!this.hasProperty(property)) throw new ReferenceError("Unknown property");
            var refl = new ReflectionProperty(property, null);
            return refl.setClass(this), refl;
        }
    },
    hasProperty: {
        value: function(property) {
            var results, lines = this.definition.toString().split("\n"), re = new RegExp(this.PROPERTY_PATTERN, "i");
            for (var line in lines) if (line = lines[line].trim(), results = re.exec(line), 
            results && results.length >= 2 && results[1] === property) return !0;
            return !1;
        }
    },
    getMethod: {
        value: function(method) {
            if (!this.hasMethod(method)) throw new ReferenceError("Unknown method");
            var refl = new ReflectionMethod(method, this.definition.prototype[method]);
            return refl.setClass(this), refl;
        }
    },
    hasMethod: {
        value: function(method) {
            return this.definition.prototype.hasOwnProperty(method) && "function" == typeof this.definition.prototype[method] ? !0 : !1;
        }
    },
    getConstant: {
        value: function(constant) {
            if (!this.hasConstant(constant)) throw new ReferenceError("Unknown constant");
            var refl = new ReflectionConstant(constant, this.definition.prototype[constant]);
            return refl.setClass(this), refl;
        }
    },
    hasConstant: {
        value: function(constant) {
            return void 0 === this.definition.prototype[constant] || this.hasMethod(constant) ? !1 : !0;
        }
    },
    create: {
        value: function() {
            return new this.definition();
        }
    }
});

var ReflectionMethod = function(name, methodPrototype) {
    if (2 !== arguments.length) throw new SyntaxError("You must specify method name and prototype");
    this.methodPrototype = methodPrototype, this.name = name, this.classOwner = null, 
    this.objectOwner = null;
};

ReflectionMethod.prototype = Object.create(Object.prototype, {
    getPrototype: {
        value: function() {
            return this.methodPrototype;
        }
    },
    getName: {
        value: function() {
            return this.name;
        }
    },
    setObject: {
        value: function(reflection) {
            if (!(reflection instanceof ReflectionObject)) throw new TypeError("Invalid object");
            if (!reflection.hasMethod(this.getName())) throw new ReferenceError("The object does not own this method");
            return this.objectOwner = reflection, this;
        }
    },
    getObject: {
        value: function() {
            return this.objectOwner;
        }
    },
    setClass: {
        value: function(reflection) {
            if (!(reflection instanceof ReflectionClass)) throw new TypeError("Invalid class");
            if (!reflection.hasMethod(this.getName())) throw new ReferenceError("The class does not own this method");
            return this.classOwner = reflection, this;
        }
    },
    getClass: {
        value: function() {
            return this.classOwner;
        }
    },
    call: {
        value: function() {
            if ("object" !== this.getContext()) throw new SyntaxError("Can call the method only if reflected from an object");
            return this.getPrototype().apply(this.objectOwner, arguments);
        }
    },
    getContext: {
        value: function() {
            return this.classOwner instanceof ReflectionClass && null === this.objectOwner ? "class" : null === this.classOwner && this.objectOwner instanceof ReflectionObject ? "object" : "unknown";
        }
    }
});

var ReflectionObject = function(object) {
    if (this === window) return new ReflectionObject(object);
    if ("object" != typeof object) throw new TypeError("You must pass an object as argument");
    this.object = object;
};

ReflectionObject.prototype = Object.create(Object.prototype, {
    getObject: {
        value: function() {
            return this.object;
        }
    },
    getProperties: {
        value: function() {
            var refl, properties = [];
            for (var prop in this.object) this.object.hasOwnProperty(prop) && (refl = new ReflectionProperty(prop, this.object[prop]), 
            refl.setObject(this), properties.push(refl));
            return properties;
        }
    },
    getProperty: {
        value: function(property) {
            if (!this.hasProperty(property)) throw new ReferenceError("Unknown property");
            var refl = new ReflectionProperty(property, this.object[property]);
            return refl.setObject(this), refl;
        }
    },
    hasProperty: {
        value: function(property) {
            return this.object.hasOwnProperty(property) ? !0 : !1;
        }
    },
    getMethod: {
        value: function(method) {
            if (!this.hasMethod(method)) throw new ReferenceError("Unknown method");
            var refl = new ReflectionMethod(method, this.object[method]);
            return refl.setObject(this), refl;
        }
    },
    hasMethod: {
        value: function(method) {
            return "function" != typeof this.object[method] || this.hasProperty(method) ? !1 : !0;
        }
    },
    getConstant: {
        value: function(constant) {
            if (!this.hasConstant(constant)) throw new ReferenceError("Unknown constant");
            var refl = new ReflectionConstant(constant, this.object[constant]);
            return refl.setObject(this), refl;
        }
    },
    hasConstant: {
        value: function(constant) {
            return !this.object[constant] || this.hasProperty(constant) || this.hasMethod(constant) ? !1 : !0;
        }
    },
    freeze: {
        value: function() {
            return Object.freeze(this.object), this;
        }
    },
    isFrozen: {
        value: function() {
            return Object.isFrozen(this.object);
        }
    },
    seal: {
        value: function() {
            return Object.seal(this.object), this;
        }
    },
    isSealed: {
        value: function() {
            return Object.isSealed(this.object);
        }
    }
});

var ReflectionProperty = function(name, value) {
    if (2 !== arguments.length) throw new SyntaxError("You must specify property name and value");
    this.value = value, this.name = name, this.classOwner = null, this.objectOwner = null;
};

ReflectionProperty.prototype = Object.create(Object.prototype, {
    getValue: {
        value: function() {
            return this.value;
        }
    },
    getName: {
        value: function() {
            return this.name;
        }
    },
    setObject: {
        value: function(reflection) {
            if (!(reflection instanceof ReflectionObject)) throw new TypeError("Invalid object");
            if (!reflection.hasProperty(this.getName())) throw new ReferenceError("The object does not own this property");
            return this.objectOwner = reflection, this;
        }
    },
    getObject: {
        value: function() {
            return this.objectOwner;
        }
    },
    setClass: {
        value: function(reflection) {
            if (!(reflection instanceof ReflectionClass)) throw new TypeError("Invalid class");
            if (!reflection.hasProperty(this.getName())) throw new ReferenceError("The class does not own this property");
            return this.classOwner = reflection, this;
        }
    },
    getClass: {
        value: function() {
            return this.classOwner;
        }
    }
});

var ReflectionConstant = function(name, value) {
    if (2 !== arguments.length) throw new SyntaxError("You must specify constant name and value");
    this.value = value, this.name = name, this.objectOwner = null, this.classOwner = null;
};

ReflectionConstant.prototype = Object.create(Object.prototype, {
    getValue: {
        value: function() {
            return this.value;
        }
    },
    getName: {
        value: function() {
            return this.name;
        }
    },
    setObject: {
        value: function(reflection) {
            if (!(reflection instanceof ReflectionObject)) throw new TypeError("Invalid object");
            if (!reflection.hasConstant(this.getName())) throw new ReferenceError("The object does not own this constant");
            return this.objectOwner = reflection, this;
        }
    },
    getObject: {
        value: function() {
            return this.objectOwner;
        }
    },
    setClass: {
        value: function(reflection) {
            if (!(reflection instanceof ReflectionClass)) throw new TypeError("Invalid class");
            if (!reflection.hasConstant(this.getName())) throw new ReferenceError("The class does not own this constant");
            return this.classOwner = reflection, this;
        }
    },
    getClass: {
        value: function() {
            return this.classOwner;
        }
    },
    isWritable: {
        value: function() {
            return this.getMeta("writable");
        }
    },
    isConfigurable: {
        value: function() {
            return this.getMeta("configurable");
        }
    },
    isEnumerable: {
        value: function() {
            return this.getMeta("enumerable");
        }
    },
    getMeta: {
        value: function(key) {
            if ("class" !== this.getContext()) throw new SyntaxError("Can get information only if reflected from a class");
            var meta = Object.getOwnPropertyDescriptor(this.classOwner.getClass().prototype, this.getName());
            return meta ? meta[key] : !1;
        }
    },
    getContext: {
        value: function() {
            return this.classOwner instanceof ReflectionClass && null === this.objectOwner ? "class" : null === this.classOwner && this.objectOwner instanceof ReflectionObject ? "object" : "unknown";
        }
    }
});