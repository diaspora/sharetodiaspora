"use strict";

var PreferenceStorage = (function() {
  function PreferenceStorage() {}

  PreferenceStorage.prototype = {
    get: function(key) {
      try {
        return JSON.parse(localStorage.getItem(key));
      } catch (_) {
        return undefined;
      }
    },

    set: function(key, value) {
      if (value) {
        localStorage.setItem(key, JSON.stringify(value));
      } else {
        localStorage.removeItem(key);
      }
    },

    remove: function(key) {
      this.set(key);
    },

    clear: function() {
      localStorage.clear();
    }
  };

  return PreferenceStorage;
})();
