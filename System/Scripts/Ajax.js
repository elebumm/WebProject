//
// JavaScript implementing Ajax functions
// by Agent Data Aps

// A simple Ajax call might look like 

// <body>
//  <input type=button onclick="adAjaxCall('myresult','http://icebreak.org:60000/ajax5.aspx?manuid=SONY');" />
//  <div id=myresult></div>
// </body>
var adAllAjaxElements = new Array();

function adAjaxElement(elmId, elmFunc) {
  this.elmId = elmId;
  this.elmRef = document.getElementById(this.elmId);
  this.elmFunc = elmFunc;
  this.GetXmlHttpObject = adAjaxGetXmlHttpObject;
  this.CallbackMethod = adAjaxCallbackMethod;
  this.CreateXmlHttp = adAjaxCreateXmlHttp;
  adAllAjaxElements[elmId] = this;
} 
//CallbackMethod will fire when the state 
//has changed, i.e. data is received back 
function adAjaxCallbackMethod() { 
  try {
      //readyState of 4 or 'complete' represents 
      //that data has been returned 
      if (this.xmlHttp.readyState == 4 || this.xmlHttp.readyState == 'complete') {
          this.elmRef.innerHTML = this.xmlHttp.responseText; 
          if (this.elmFunc) {
              eval(this.elmFunc);
          }    
      }
  }
  catch(e){alert("adAjaxCallbackMethod:" + e.message);}
}

function adAjaxGetXmlHttpObject() { 
   var objXmlHttp = null;

// Mozilla | Netscape | Safari | IE7
   try {
     objXmlHttp = new XMLHttpRequest();

   }
   catch(e) {}
   
// Microsoft via active X
   if (objXmlHttp == null) {
      objXmlHttp = adAjaxGetMSXmlHttp();
   }

   if (objXmlHttp == null) {
      return null; 
   }

   try {
     objXmlHttp.onload = eval("new Function('adAllAjaxElements[\""  + this.elmId + "\"].CallbackMethod();')");
     objXmlHttp.onerror = eval("new Function('adAllAjaxElements[\""  + this.elmId + "\"].CallbackMethod();')");
   }
   catch(e) {}

   try {
      objXmlHttp.onreadystatechange = eval("new Function('adAllAjaxElements[\""  + this.elmId + "\"].CallbackMethod();')");
   }
   catch(e) {}

   return objXmlHttp; 
} 

function adAjaxGetMSXmlHttp() {
  var xmlHttp = null;
  var clsids = ["Msxml2.XMLHTTP.6.0","Msxml2.XMLHTTP.5.0",
               "Msxml2.XMLHTTP.4.0","Msxml2.XMLHTTP.3.0", 
               "Msxml2.XMLHTTP.2.6","Microsoft.XMLHTTP.1.0", 
               "Microsoft.XMLHTTP.1","Microsoft.XMLHTTP"];
  for(var i=0; i<clsids.length && xmlHttp == null; i++) {
      xmlHttp = adAjaxCreateXmlHttp(clsids[i]);
  }
  return xmlHttp;
}

function adAjaxCreateXmlHttp(clsid) {
  var xmlHttp = null;
  try {
      xmlHttp = new ActiveXObject(clsid);
      lastclsid = clsid;
      return xmlHttp;
  }
  catch(e){}
}


function adAjaxCall(elmid, url, elmFunc, payload) { 
    var a = new adAjaxElement(elmid, elmFunc);
		if (typeof payload == 'undefined') payload = null;
    try { 
        a.xmlHttp = a.GetXmlHttpObject();
        a.xmlHttp.open('POST', url, true); 
        a.xmlHttp.send(payload);
    }
    catch(e){alert("adAjaxCall:" + e.message);} 
}