"use strict";

document.addEventListener("DOMContentLoaded", function() {
  document.getElementById("delPrefs").addEventListener("click", function(e) {
    localStorage.clear();
    document.getElementById("preferences").style.display = "none";
    e.preventDefault();
  });

  if (localStorage.length > 0) {
    document.getElementById("preferences").style.display = "block";
  }
});
