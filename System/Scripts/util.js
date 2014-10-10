//
// JavaScript Utility functions
// by Agent Data Aps
//

// XMLHttp releated functions
// --------------------------
function adGetResource(url) {
	var xmlhttp = adGetXMLHTTP();
	try {
		xmlhttp.open("GET", url, false);
		xmlhttp.setRequestHeader("CharSet", "windows-1252");
		xmlhttp.send(null);
	}
	catch(ex){
		return ex.message;
	}
	return xmlhttp.responseText;
}

function adGetResourceObject(url) {
	var objDefStr = adGetResource(url);
	var obj;
	try {
		var str = "new Object(" + objDefStr + ")";
		obj = eval(str);
	}
	catch(ex){
		alert(ex.message);
		alert(str);
		obj = null;
	}
	return obj;
}

function adGetXMLHTTP() {
	var xmlhttp;
	try {
		xmlhttp = new ActiveXObject("Msxml2.XMLHTTP");
	}
	catch(ex) {
		try {
			xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
		}
		catch(ex) {
			xmlhttp = false;
		}
	}
	if(!xmlhttp && typeof XMLHttpRequest != 'undefined') {
		xmlhttp = new XMLHttpRequest( );
	}
	return xmlhttp;
}

// Form releated functions
// -----------------------
function adSetSelectOption( elem, val ) {
	for (var i=0; i<elem.options.length; i++) {
		if (elem.options[i].value==val) {
			elem.options[i].selected = true;
			elem.selectedIndex = i;
		}
		else {
			elem.options[i].selected = false;
		}
	}
}


// Set all input fields with the specified class to readOnly
function adProtectClass( frm, cls) {
	for (var i=0; i<frm.elements.length; i++) {
		var clsNames = frm.elements[i].className;
		var clsArr = clsNames.split(" ");
		for (var j=0; j<clsArr.length; j++) {
			if (clsArr[j] == cls) {
				frm.elements[i].readOnly = true;
				break;
			}
		}
	}
}

// Set Class Attributes on the form
function adSetClassAttr( frm ) {
	for (var i=0; i<frm.elements.length; i++) {
		var clsNames = frm.elements[i].className;
		var clsArr = clsNames.split(" ");
		for (var j=0; j<clsArr.length; j++) {

			switch (clsArr[j]){
				case "PROTECT":
					frm.elements[i].readOnly = true;
					break;	
				case "READONLY=1":
					frm.elements[i].readOnly = true;
					break;	
				case "READONLY=0":
					frm.elements[i].readOnly = false;
					break;	
				case "CHECKED=0":
					frm.elements[i].checked = false;
					break;	
				case "CHECKED=1":
					frm.elements[i].checked = true;
					break;	
			}
		}
	}
}

// Set focus on the first possible field
function adSetFormStatus() {

	for (var i=0; i<document.forms.length; i++) {
		var frm = document.forms[i];
	  adSetClassAttr( frm );
		for (var j=0; j<frm.elements.length; j++) {
			if (frm.elements[j].readOnly==false) {
				try {
					frm.elements[j].focus();
					frm.elements[j].select();
					break;
				}
				catch (e) {}
			}
		}
	}
}

// Set focus and selected on a element
function adSetElemFocus(elem){
	elem.focus();
	elem.select();
//			setTimeout("adSetElemFocus('elem')", 1000);
}


// Loop igennem alle forms og alle felter, ved match sættes der fucus() og select()
function adSetFocus(fieldName) {

//  alert("Start adSetFocus: " + fieldName);
	for (var i=0; i<document.forms.length; i++) {
		var frm = document.forms[i];
		for (var i=0; i<frm.elements.length; i++) {
			if (frm.elements[i].name == fieldName) {
				try {
//				  alert("Out of range: " + fieldName + " IIIII: " + i);
					frm.elements[i].focus();
					frm.elements[i].select();
					return;
					break;
				}
				catch (e) {}
			}
		}
	}
}

// Check range for numeric value
function adCheckRange(elem, min, max) {
	if (elem) {
  	if (elem.value < min || elem.value > max){
			elem.form.inputOk.value = false; 
			adSetFocus(elem.name);
      alert("Out of range: " + elem.value + " Valid range for the field is " + min + " to " + max + "." );
			adSetFocus(elem.name);
			return false;
		}
	}
	return true;
}

// Set focus on the first input field
function adSetFocusFirst() {
	for (var i=0; i<document.forms.length; i++) {
		var frm = document.forms[i];
		for (var j=0; j<frm.elements.length; j++) {
			if (frm.elements[j].readOnly == false) {
				try {
					frm.elements[j].focus();
					return;
				}
				catch (e) {}
			}
		}
	}
	return;
}

// DOM releated functions
// ----------------------
function adRemoveChildNodes(elem) {
	try {
		while (elem.childNodes.length > 0) {
			elem.removeChild(elem.childNodes[0]);
		}
	}
	catch (e) {};
}

// Convert string to uppercase
// ---------------------------
function adToupper (obj) {
  obj.value = obj.value.toUpperCase();
}

// Edit float to string 
// --------------------
function adEditDec(v , prec) {
  var findDec = 1.1;
	var dp = findDec.toFixed.substr(2,1);
	var thSep = dp  == '.' ? ',' : '.';
  p = 1;
  pc = "";
  for (i=0;i < prec; i++){ 
    p *= 10;
    pc = pc + "0";
  }

  v = (Math.round((v-0)*p))/p;
  if (prec == 0) return (String(v));
  v = (v == Math.floor(v)) ? v + thsep + pc : ((v*10 == Math.floor(v*10)) ? v + "0" : v);
  v = String(v);
  var ps = v.split('.');
  var whole = ps[0];
  var sub = ps[1] ? dp + ps[1] : dp + pc;
  var r = /(\d+)(\d{3})/;
  while (r.test(whole)) {
    whole = whole.replace(r, '$1' + thSep  + '$2');
  }
  return whole + sub ;
}

// Convert the store record to form object used in ajax (extJs helper)
function form2params(form) {
  var params =  new Object();

  form.form.items.each(function(field) {
    if (field instanceof Ext.form.DateField) {
      params[field.getName()] = field.getValue().dateFormat("Y-m-d");
    } else {                 //if (field instanceof Ext.form.Checkbox) {
      params[field.getName()] = field.getValue();
    }
  });
  return params;
}            
