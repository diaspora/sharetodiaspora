/*
 *= require l20n/dist/webcompat/l20n
 *
 *= require lib/diaspora_sharer
 */

"use strict";

var diasporaSharer = new DiasporaSharer();

window.addEventListener("load", function() {
  diasporaSharer.earlyRedirect();
});

document.addEventListener("DOMContentLoaded", function() {
  diasporaSharer.initDom({
    customHostForm: "#customHostForm",
    customHostInput: "#customHostInput",
    podListItems: "#podlist a",
    markdownCheckbox: "#markdown",
    rememberCheckbox: "#remember",
    resetButton: "#reset"
  });
});
