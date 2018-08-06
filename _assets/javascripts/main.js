/*
 *= require lib/diaspora_sharer
 */
/* global DiasporaSharer */

"use strict";

var diasporaSharer = new DiasporaSharer();

window.addEventListener("load", function() {
  diasporaSharer.earlyRedirect();
});

document.addEventListener("DOMContentLoaded", function() {
  diasporaSharer.initDom({
    customHostForm: "#customHostForm",
    customHostInput: "#customHostInput",
    loader: ".loader",
    podListItems: "#podlist a",
    markdownCheckbox: "#markdown",
    rememberCheckbox: "#remember",
    resetButton: "#reset"
  });
});
