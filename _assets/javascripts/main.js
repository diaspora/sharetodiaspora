/*
 *= require l20n/dist/webcompat/l20n
 *
 *= require lib/preference_storage
 *= require lib/utils
 */
/* global PreferenceStorage, Utils */

"use strict";

var DiasporaSharer = (function() {
  function DiasporaSharer() {
    this._prefs = new PreferenceStorage();
    this._params = Utils.locationSearchToObject();
  }

  DiasporaSharer.prototype = {
    earlyRedirect: function() {
      if (!(this._params.title || this._params.url)) {
        this.redirect("/about.html");
      }

      var autojumpUrl = this._prefs.get("autojumpUrl");
      if (autojumpUrl && !this._params.nojump) {
        this.redirect(autojumpUrl);
      }
    },

    redirect: function(target) {
      window.location = target;
    }
  };

  return DiasporaSharer;
})();

var diasporaSharer = new DiasporaSharer();

window.addEventListener("load", function() {
  diasporaSharer.earlyRedirect();
});
