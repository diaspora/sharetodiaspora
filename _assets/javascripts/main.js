/*
 *= require l20n/dist/webcompat/l20n
 */

// Finds the values of URL parameters after "?"
var par = function(name){ /* from Netlobo.com (http://www.netlobo.com/url_query_string_javascript.html) */
  var regexS = "[\\?&]"+name+"=([^&]*)";
  var regex = new RegExp ( regexS );
  var tmpURL = window.location.href;

  var results = regex.exec( tmpURL );
  if( results == null )
    return"";
  else
    return results[1];
}

var title = decodeURIComponent(par('title'));
var url = decodeURIComponent(par('url'));
var notes = decodeURIComponent(par('notes'));
var redir = decodeURIComponent(par('redirect'));
var urlautolist = decodeURIComponent(par('urlautolist'));
var shortened = null;
var use_shortened = false;
var oldtit = title;
var oldurl = url;
var oldnot = notes;

// Directly redirects or stays in the page
var redirect = function() {
  if (title===""&&url==="") {
    document.querySelector('body').innerHTML = '';
    location.href="./about.html";
  } else {
    if (localStorage.remember && localStorage.remember === "true" && localStorage.lastPod && redir !== "false") {
      document.querySelector('body').innerHTML="Sharing <b>"+title+"</b> ("+url+") to "+localStorage.lastPod;
      share(localStorage.lastPod);
    } else {
      crealinks();
      if(urlautolist !== 'none') {
        createpodautocomplete();
      }
      return false;
    }
  }
}

// Creates links for pods used by the user
var crealinks = function() {
  var pods = document.querySelectorAll('#podlist a');

  if (localStorage['forget'] === 'true') {
    document.getElementById('norem').checked='checked';
  } else {
    var stored_pods = [localStorage.lastPod, localStorage.lastPod2, localStorage.lastPod3];

    for (var i in stored_pods) {
      var p = stored_pods[i];
      if (p) {
        var an = document.createElement('a');
        an.classList.add("lastpod");
        an.title = p;
        if (document.getElementsByTagName('body')[0].innerText) {
          an.innerText = p;
        } else {
          an.textContent = p;
        }

        for (i=0;i<pods.length;i++) {
          if (pods[i].title === p) {
            pods[i].classList.add("hidepod");
          }
        }

        document.getElementById('podlist').insertBefore(an, document.querySelectorAll('#podlist a')[0]);
      }
    }
  }

  updlinks();

  document.getElementById('delete').onclick = forget;

  document.getElementById('shorten').onchange = toggleShorten;

  document.getElementById('markdown').onchange = toggleMarkdown;

  if (localStorage.markdown == "true") toggleMarkdown();
  toggleShorten();
}

// Converts title and URL into Markdown syntax if necessary
var toggleMarkdown = function() {
  var inserted = use_shortened ? shortened : url;
  if (document.getElementById('markdown').checked) {
    title = '['+title+']('+url+')';
    url = ' ';
    localStorage.markdown = "true";
  } else {
    title = oldtit;
    url = oldurl;
    localStorage.markdown = "false";
  }
  updlinks();
}

// Shortens url if necessary
var toggleShorten = function() {
  use_shortened = document.getElementById('shorten').checked;
  if (use_shortened && !shortened) {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "http://api.bitly.com/v3/shorten?login=bartimeo&apiKey=R_5fe8386a052e3f3d6ece604eab0c59db&format=txt&domain=j.mp&longUrl="+url);
    xhr.onreadystatechange = function() {
      if(xhr.readyState == 4) {
        if(xhr.status==200) {
          console.log(xhr.responseText);
          shurl = decodeURIComponent(encodeURIComponent(xhr.responseText).replace("%0A",""));
          document.querySelector("#shareurl").textContent = shurl;
          toggleMarkdown();
          updlinks();
        } else {
          console.log("Error:", xhr);
        }
      }
    }
    xhr.send();
  } else if (!use_shortened) {
    document.querySelector("#shareurl").textContent = oldurl;
    toggleMarkdown();
  }
}

// Changes 'href' values of pod links
var updlinks = function() {
  var pods = document.querySelectorAll('#podlist a');
  var inserted = use_shortened ? shortened : url;

  for (i=0;i<pods.length;i++) {
    var purl = "http://"+pods[i].title+"/bookmarklet?url="+encodeURIComponent(inserted)+"&title="+encodeURIComponent(title);
    if (notes!=="") { purl += "&notes="+encodeURIComponent(notes); }
    purl += "&jump=doclose";
    pods[i].href = purl;

    pods[i].onclick = function() {
      extras(this.title);
    };
  }
}

// Stores information about used pods
var remember = function(l) {
  if (localStorage.lastPod && localStorage.lastPod!==l) {
    if (localStorage.lastPod2 && localStorage.lastPod2!==l) {
      localStorage.lastPod3 = localStorage.lastPod2;
    }
    localStorage.lastPod2 = localStorage.lastPod;
  }
  localStorage.lastPod = l;

  return true;
}

// Calculates URL and redirects (for direct redirection and custom pod)
var share = function(u) {
  if (u!=="") {
    extras(u);
    var nu = /^http/.test(u) ? u : ("http://" + u);
    nu += "/bookmarklet?url="+encodeURIComponent(url)+"&title="+encodeURIComponent(title);
    if (notes!=="") { nu += "&notes="+encodeURIComponent(notes); }
    nu += "&jump=doclose";
    location.href = nu;
  } else {
    document.getElementById('podurl').className="error";
  }
}

// Frees stored user information about pods
var forget = function() {
  localStorage.removeItem('lastPod');
  localStorage.removeItem('lastPod2');
  localStorage.removeItem('lastPod3');
  var hidden = document.querySelectorAll('.hidepod');
  for (var i in hidden) {
    try {
      hidden[i].classList.remove("hidepod");
    } catch(e) {}
  }
  var lastpods = document.querySelectorAll('.lastpod');
  for (var j in lastpods) {
    try {
      lastpods[j].parentNode.removeChild(lastpods[j]);
    } catch(e) {}
  }
}

// Saves settings about pods and automatic redirection
var extras = function(l) {
  // Retrieving current settings or saved settings
  var r = document.getElementById('remember') ? document.getElementById('remember').checked : localStorage.remember == "true";
  var nr = document.getElementById('norem') ? document.getElementById('norem').checked : localStorage.forget == "true";

  if (r) {
    localStorage.remember = "true";

    if (nr) {
      localStorage.lastPod = l;
    }
  } else {
    localStorage.remember = "false";
  }

  if (!nr) {
    remember(l);
  } else {
    localStorage.forget = 'true';
  }

  return true;
}

// generate list for autocomplete pod url
var createpodautocomplete = function() {
  var now = Math.round(Date.now() / 1000);
  if(localStorage.podslisttime && ((parseInt(localStorage.podslisttime) + 86400) > now)) {
    loadpodslistfromlocalstorage();
  } else {
    var script = document.createElement('script');
    script.src = 'https://podupti.me/api.php?key=4r45tg&format=json&method=jsonp&callback=loadpodslistfrompoduptime';
    document.head.appendChild(script);
  }
};

// load pods list from poduptime site
var loadpodslistfrompoduptime = function(result) {
  if(typeof(result.podcount) !== 'undefined') {
    var pods = [];
    for(var i = 0; i < result.podcount; i++) {
      var pod = result.pods[i];
      if(pod.status.toLowerCase() === 'up') {
        pods[pods.length] = pod.domain;
      }
    }
    pods = pods.sort();
    localStorage.podslist = JSON.stringify(pods);
    localStorage.podslisttime = Math.round(Date.now() / 1000);
    generatepodslist(pods);
  }
}

// load pods list from localstorage
var loadpodslistfromlocalstorage = function() {
  var pods = JSON.parse(localStorage.podslist);
  generatepodslist(pods);
}

var generatepodslist = function(pods) {
    var podsHtmlList = document.createElement('datalist');
    podsHtmlList.setAttribute('id','podslist');
    for(var i = 0; i < pods.length; i++) {
      var optionHtml = document.createElement('option');
      optionHtml.setAttribute('value', pods[i]);
      podsHtmlList.appendChild(optionHtml);
    }
    document.getElementById('podinput').appendChild(podsHtmlList);
    document.getElementById('podurl').setAttribute('list', 'podslist');
    document.getElementById('podurl').placeholder = pods[Math.floor(Math.random() * pods.length)];
}

window.onload = redirect;
