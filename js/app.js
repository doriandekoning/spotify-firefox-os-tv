// DOMContentLoaded is fired once the document has been loaded and parsed,
// but without waiting for other external resources to load (css/images/etc)
// That makes the app more responsive and perceived as faster.
// https://developer.mozilla.org/Web/Reference/Events/DOMContentLoaded
var clientid;
window.addEventListener('DOMContentLoaded', function() {

  // We'll ask the browser to use strict code to help us catch errors earlier.
  // https://developer.mozilla.org/Web/JavaScript/Reference/Functions_and_function_scope/Strict_mode
  'use strict';

  var translate = navigator.mozL10n.get;

  // We want to wait until the localisations library has loaded all the strings.
  // So we'll tell it to let us know once it's ready.
  navigator.mozL10n.once(start);

  // ---

  function start() {
    var message = document.getElementById('message');
    // We're using textContent because inserting content from external sources into your page using innerHTML can be dangerous.
    // https://developer.mozilla.org/Web/API/Element.innerHTML#Security_considerations
    message.textContent = translate('message');
  
    
  }

});
var interval_poll_accescodes;
$(document).ready(function(){
  // $('#qr-code').svg({loadURL: 'http://80.100.203.254:8888/'});
  /*  $.ajax({url: "http://80.100.203.254:8888/", dataType: "html", success: function(result){

        $("#qr-code").html(result);
        $("#qr-code").children().height(100);
  /*      $.ajax({url: "http://80.100.203.254:8888/logedin", dataType: "html", success: function(result){
          console.log(result);
        }});*/
    //}});
  $.ajax({url: "http://80.100.203.254:8888/", dataType: "json", success: function(result){
    clientid = result.client_id;
    $("#qr-code").qrcode({
      "size": 100,
      "color": "#3a3",
      "text": result.qr_url + result.client_id
    });
        console.log(clientid);
    interval_poll_accescodes =
    setInterval(function(result){
      $.ajax({ 
        url: "http://80.100.203.254:8888/poll_codes?id=" + clientid, 
        success: function(data){
          if(typeof data.access_token!= 'undefined'){
            clearInterval(interval_poll_accescodes);
          }
        }, 
        dataType: "json", 
        timeout: 1000
      });
    }, 1000);
  }});

});