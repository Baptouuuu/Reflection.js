# Reflection.js

[![Build Status](https://travis-ci.org/Baptouuuu/Reflection.js.png?branch=master)](https://travis-ci.org/Baptouuuu/Reflection.js)

This library is here to help you manipulate and get informations about objects.

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
