"use strict";

document.addEventListener("DOMContentLoaded", function() {
  document.getElementById("fxAdd").addEventListener("click", function(e) {
    var event = new CustomEvent("ActivateSocialFeature");
    this.setAttribute("data-service", JSON.stringify(window.firefoxShareData));
    this.dispatchEvent(event);
    e.preventDefault();
  });
});
