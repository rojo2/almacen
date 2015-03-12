# Almacen

## How to use it

```
var almacen = require('almacen');

almacen.local.set('hello','World!');
almacen.session.set('foo','bar');

almacen.session.get('foo') === 'bar'; // true

almacen.local.set('object', {
  "a": [
    "b": 1
  ]
});

almacen.local.get('object')

```
