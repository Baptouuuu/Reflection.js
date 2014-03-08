# Reflection.js

[![Build Status](https://travis-ci.org/Baptouuuu/Reflection.js.png?branch=master)](https://travis-ci.org/Baptouuuu/Reflection.js)

This library is here to help you manipulate and get informations about objects via a more coherent syntax than the one offered by vanilla javascript.

## Terminology

Before explaining how to use the library, a bit of terminology so you understand the logic.

```js
var ImAClass = function () {
    this.isAProperty = null;
};
ImAClass.prototype = Object.create(Object.prototype, {
    CONSTANT: {
        value: 42,
        writable: true|false,       //yes, kind of sily to say a constant is writable
        configurable: true|false,
        enumerable: true|false
    },

    imAMethod: {
        value: function () {}
    }
});
```

## Usage

All the examples below are based on the following class, and objects are instances of it.
```js
var Planet = function () {
    this.size = this.DEFAULT_SIZE;
    this.revolution = null;
};
Planet.prototype = Object.create(Object.prototype, {
    DEFAULT_SIZE: {
        value: 42,
        writable: false,
        configurable: false,
        enumerable: true
    },
    setRevolution: {
        value: function (revolution) {
            this.revolution = revolution;
            return this;
        }
    },
    getRevolution: {
        value: function () {
            return this.revolution;
        }
    },
    setSize: {
        value: function (size) {
            this.size = size;
            return this;
        }
    },
    getSize: {
        value: function () {
            return this.size;
        }
    }
});
```

### Object

To get a reflected object:
```js
var magrathea = new Planet(),
    reflected = new ReflectionObject(magrathea);
```

To get back the object you can do:
```js
reflected.getObject(); //=== magrathea
```

### Properties

To get the list of the object properties:
```js
var props = reflected.getProperties(); //will return a array of two ReflectionProperty
```

To know if the object has a property:
```js
reflected.hasProperty('size'); //will return true
reflected.hasProperty('name'); //will return false
```

To get the reflected object for a property:
```js
reflected.getProperty('size'); //will return an instance of ReflectionProperty
```

### Methods

To get the reflected object for a property:
```js
reflected.getMethod('getSize'); //will return an instance of ReflectionMethod
```

And to know if the object has a method:
```js
reflected.hasMethod('getSize'); //will return true
reflected.hasMethod('getName'); //will return false
```

### Constants

To get the reflected object for a constant:
```js
reflected.getConstant('DEFAULT_SIZE'); //will return an instance of ReflectionConstant
```

And to know if the object has a constant:
```js
reflected.hasConstant('DEFAULT_SIZE'); //will return true
reflected.hasConstant('DEFAULT_REVOLUTION'); //will return false
```

### Freezing/Sealing

To freeze the object (prevent adding or modifying object properties):
```js
reflected.freeze();
reflected.isFrozen(); //will return true
```

To seal the object (prevent adding new properties):
```js
reflected.seal();
reflected.isSealed(); //will return true
```

## Class

To get a reflected object:
```js
var reflected = new ReflectionClass(Planet);
```

You can get back the class via:
```js
reflected.getClass(); //=== Planet
```

### Properties

**Important**: In the context of a class the `ReflectionProperty` does not contain the property value.

To get the list of properties:
```js
var props = reflected.getProperties(); //will return an array of two instance of ReflectionProperty
```
**Note**: `ReflectionClass` use regular expression to find the list of properties, so use it with care.

To get the reflected object for a property:
```js
reflected.getProperty('size'); //will return an instance of ReflectionProperty
```

And to know if the class has a property:
```js
reflected.hasProperty('size'); //will return true
reflected.hasProperty('name'); //will return false
```

### Methods

To get the reflected object for a method:
```js
reflected.getMethod('getSize'); //will return an instance of ReflectionMethod
```

And to know if the class has a method:
```js
reflected.hasMethod('getSize');  //will return true
reflected.hasMethod('getName');  //will return false
```

### Constants

To get the reflected object for a constant:
```js
reflected.getConstant('DEFAULT_SIZE'); //return an instance of ReflectionConstant
```

And to know if the class has a constant:
```js
reflected.hasConstant('DEFAULT_SIZE'); //will return true
reflected.hasConstant('DEFAULT_REVOLUTION'); //will return false
```

### Instanciation

You can instanciate a new object directly from the reflected object by doing:
```js
reflected.create(); //will return an instance of Planet
```
**Important**: Javascript don't allow to dynamically pass arguments to a constructor (at least I didn't find how), so you can't pass arguments via `create`.

## `ReflectionProperty`

### Name

To get the property name:
```js
reflectedProperty.getName(); //will return size
```

### Value

to get the property value:
```js
reflectedProperty.getValue(); //will return 42
```
**Important**: in the context the property reflection is got from a class, `getValue` will return `null`.

### Object/Class

You can retrieve back the object or the class the property is taken from:
```js
reflectedProperty.getObject(); //=== magrathea
reflectedProperty.getClass(); //=== Planet
```
It can be useful if you pass the reflected object to a function that don't have a reference to the original object/class.

## `ReflectionMethod`

### Name

To get the method name:
```js
reflectedMethod.getName(); //will return getSize
```

### Prototype

To get the method body:
```js
reflectedMethod.getPrototype(); //will return the function
```

### Object/Class

You can retrieve back the object or the class the method is taken from:
```js
reflectedProperty.getObject(); //=== magrathea
reflectedProperty.getClass(); //=== Planet
```

### Call

You can directly call the method by doing:
```js
reflectedMethod.call(24); //reflectMethod.getObject().getSize() === 24
```
**Important**: `call` is available only if the method is taken from an object.

## `ReflectionConstant`

### Name

To get the constant name:
```js
reflectedConstant.getName(); //=== 'DEFAULT_SIZE'
```

### Value

To get the constant value:
```js
reflectionConstant.getValue(); //=== 42
```

### Object/Class

You can retrieve back the object or the class the constant is taken from:
```js
reflectedProperty.getObject(); //=== magrathea
reflectedProperty.getClass(); //=== Planet
```

### Meta informations

**Important**: those methods are only available in the case the constant is taken from a class.

You can know if the constant is writable by doing:
```js
reflectedConstant.isWritable(); //will return false
```

You can know if the constant is configurable by doing:
```js
reflectedConstant.isConfigurable(); //will return false
```

You can know if the constant is enumerable by doing:
```js
reflectedConstant.isEnumerable(); //will return true
```