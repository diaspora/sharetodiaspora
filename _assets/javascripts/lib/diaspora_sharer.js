/*
 *= require lib/preference_storage
 *= require lib/utils
 */
/* global PreferenceStorage, Utils */

"use strict";

var DiasporaSharer = (function() {
  function DiasporaSharer() {
    this._loader = false;
    this._params = Utils.locationSearchToObject();
    this._prefs = new PreferenceStorage();
  }

  DiasporaSharer.prototype = {
    earlyRedirect: function() {
      if (!(this._params.title || this._params.url)) {
        this.redirect("/about.html");
      }

      var autojumpPod = this._prefs.get("autojumpPod");
      if (autojumpPod && !this._params.nojump) {
        this.shareToPod(autojumpPod);
      }
    },

    initDom: function(selectors) {
      if (!selectors) {
        return;
      }

      var customHostForm = document.querySelector(selectors.customHostForm),
        customHostInput = document.querySelector(selectors.customHostInput);
      if (customHostForm && customHostInput) {
        customHostInput.value = this._prefs.get("lastCustomHost");

        customHostForm.addEventListener("submit", function(event) {
          event.preventDefault();
          this._prefs.set("lastCustomHost", customHostInput.value);
          this.shareToPod(customHostInput.value);
        }.bind(this));
      }

      var loader = document.querySelector(selectors.loader);
      if (loader) {
        this._loader = loader;
      }

      var podListItems = document.querySelectorAll(selectors.podListItems);
      if (podListItems) {
        for (var i = 0; i < podListItems.length; i++) {
          podListItems[i].addEventListener("click", function(event) {
            event.preventDefault();
            this.shareToPod(event.target.dataset.host);
          }.bind(this));
        }
      }

      var markdownCheckbox = document.querySelector(selectors.markdownCheckbox);
      if (markdownCheckbox) {
        markdownCheckbox.checked = this._prefs.get("enableMarkdown");

        markdownCheckbox.addEventListener("change", function(event) {
          this._prefs.set("enableMarkdown", event.target.checked);
        }.bind(this));
      }

      var rememberCheckbox = document.querySelector(selectors.rememberCheckbox);
      if (rememberCheckbox) {
        rememberCheckbox.checked = this._prefs.get("enableAutojump");

        rememberCheckbox.addEventListener("change", function(event) {
          this._prefs.set("enableAutojump", event.target.checked);
        }.bind(this));
      }

      var resetButton = document.querySelector(selectors.resetButton);
      if (resetButton) {
        resetButton.addEventListener("click", function(event) {
          event.preventDefault();
          this._prefs.clear();
        }.bind(this));
      }
    },

    shareToPod: function(podHost) {
      if (this._prefs.get("enableAutojump")) {
        this._prefs.set("autojumpPod", podHost);
      }

      podHost = podHost.replace(/http(s)?:\/\//, "").replace(/\/$/, "");
      this.redirect(this.getShareUrl(podHost));
    },

    getShareUrl: function(podHost) {
      var shareUrl = "https://" + podHost + "/bookmarklet";
      if (this._prefs.get("enableMarkdown")) {
        shareUrl += Utils.buildSearchString({
          content: "[" + this._params.title + "](" + this._params.url + ")"
        });
      } else {
        shareUrl += Utils.buildSearchString({
          url: this._params.url,
          title: this._params.title
        });
      }
      return shareUrl;
    },

    redirect: function(target) {
      this.setLoader(true);
      window.location = target;
    },

    setLoader: function(state) {
      if (state) {
        this._loader.style.display = "block";
      } else {
        this._loader.style.display = "none";
      }
    }
  };

  return DiasporaSharer;
})();
