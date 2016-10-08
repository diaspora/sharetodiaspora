"use strict";

document.addEventListener("DOMContentLoaded", function() {
  document.getElementById("fxAdd").addEventListener("click", function(e) {
    var event = new CustomEvent("ActivateSocialFeature");
    this.setAttribute("data-service", JSON.stringify(window.firefoxShareData));
    this.dispatchEvent(event);
    e.preventDefault();
  });

  document.getElementById("delPrefs").addEventListener("click", function(e) {
    localStorage.clear();
    document.getElementById("preferences").style.display = "none";
    e.preventDefault();
  });

  if (localStorage.length > 0) {
    document.getElementById("preferences").style.display = "block";
  }
});
