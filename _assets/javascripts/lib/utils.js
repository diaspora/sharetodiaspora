"use strict";

var Utils = {
  locationSearchToObject: function() {
    if (!document.location.search) {
      return {};
    }

    var parameters = {};
    document.location.search.substring(1).split("&").forEach(function(param) {
      param = param.split("=");
      parameters[decodeURIComponent(param[0])] = decodeURIComponent(param[1]);
    });

    return parameters;
  }
};
