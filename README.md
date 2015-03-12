# Almacen

## How to use it

Using [browserify](http://browserify.org) it's easy to use it.

```javascript
var almacen = require("almacen");

almacen.local.set("hello","world!");
almacen.session.set("foo","bar");

almacen.session.get("foo") === "bar"; // true

almacen.local.set("object", {
  "a": [
    "b": 1
  ]
});

almacen.local.get("object")
```

But this works too with [RequireJS](http://requirejs.org).

```javascript
define(["almacen"], function(almacen) {

  almacen.local.set("hello","world");

});
```

or even directly in the browser.

```html

<script src="almacen.js"></script>
<script>

  almacen.local.set("hello","world");

</script>

```

Made with ❤ by ROJO 2 (http://rojo2.com)
