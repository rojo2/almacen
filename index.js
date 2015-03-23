var JSON_DATA_SCHEME = 'data:application/json,';

var DataUtils = {
  scheme: function(type, encoding) {
    var str = 'data:' + type;
    if (encoding !== undefined) {
      str += ';' + encoding;
    }
    str += ',';
    return str;
  },
  toData: function(data, type, encoding) {
    return this.scheme(type, encoding) + data;
  },
  fromData: function(data, type, encoding) {
    return data.substr(this.scheme(type, encoding).length);
  },
  is: function(data, type) {
    var str = 'data:' + type;
    return (data.substr(0, str.length) === str);
  }
};

function Storage(storage) { this.storage = storage; }

Storage.prototype = {
  constructor: Storage,
  storage: null, 
  set: function(name, value, serializer) {
    if (typeof value !== 'string' && typeof value !== 'number' && typeof value !== 'boolean') {
      if (typeof serializer === 'function') {
        value = serializer(value);
      } else {
        value = DataUtils.toData(
          JSON.stringify(value), 
          'application/json'
        );
      }
    }
    this.storage.setItem(name, value);
  },
  get: function(name, deserializer) {
    var value = this.storage.getItem(name);
    if (value) {
      if (typeof deserializer === 'function') {
        return deserializer(value);
      } else if (DataUtils.is(value, 'application/json')) {
        return JSON.parse(
          DataUtils.fromData(value, 'application/json')
        );
      } else if (value === 'true' || value === 'false') {
        return value === 'true';
      } else if (/^-?[0-9]+(\.[0-9]+)?$/.test(value)) {
        return parseFloat(value);
      }
    }
    return value;
  },
  has: function(name) {
    return this.storage.getItem(name) !== null;
  },
  unset: function(name) {
    this.storage.removeItem(name);
  },
  clear: function() {
    this.storage.clear();
  }
};

var almacen = {
  local: new Storage(window.localStorage),
  session: new Storage(window.sessionStorage)
};

// UMD
(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    define([], factory);
  } else if (typeof exports === 'object') {
    module.exports = factory();
  } else {
    root.almacen = factory();
  }
}(this, function () {
  return almacen;
}));
