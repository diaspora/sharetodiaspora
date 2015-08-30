"use strict";

var PreferenceStorage = (function() {
  function PreferenceStorage() {}

  PreferenceStorage.prototype = {
    get: function(key) {
      return localStorage.getItem(key);
    },

    set: function(key, value) {
      if (value) {
        localStorage.setItem(key, value);
      } else {
        localStorage.removeItem(key);
      }
    },

    remove: function(key) {
      this.set(key);
    }
  };

  return PreferenceStorage;
})();
