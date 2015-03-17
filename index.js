var JSON_DATA_SCHEME = 'data:application/json,';

function Storage(storage) { this.storage = storage; }

Storage.prototype = {
  constructor: Storage,
  storage: null, 
  set: function(name,value) {
    if (typeof value !== 'string' && typeof value !== 'number' && typeof value !== 'boolean') {
      value = JSON_DATA_SCHEME + JSON.stringify(value);
    }
    this.storage.setItem(name, value);
  },
  get: function(name) {
    var value = this.storage.getItem(name);
    if (value) {
      if (value.substr(0,JSON_DATA_SCHEME.length) === JSON_DATA_SCHEME) {
        return JSON.parse(value.substr(JSON_DATA_SCHEME.length));
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
  return {
    local: new Storage(window.localStorage),
    session: new Storage(window.sessionStorage)
  };
}));

