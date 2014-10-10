//
// Scripts for IceBreak Wizards
//
function doAction(frm, act) {
	if (frm.action) {
		frm.action.value = act;
		frm.submit();
	}
	return true;
}

function goback() {
	history.back();
}

function refresh( frm ) {
	doAction(frm, frm.PrevAction.value );
	return true;
}

function checkFileSel() {
	for (var i=0; i<document.form1.filelib.length; i++) {
		if (document.form1.filelib[i].checked) {
			return true;
		}
	}
	alert('You must select a file from the list before you can continue.');
	return false;
}

function checkServerSel() {
	for (var i=0; i<document.form1.server.length; i++) {
		if (document.form1.server[i].checked) {
			return true;
		}
	}
	alert('You must select a server from the list before you can continue.');
	return false;
}

function checkListSel() {
	var elem;
	for (var i=1; i<=document.form1.FieldCount.value; i++) {
		var fn="Fields." + i + ".InList";
		if (elem=document.getElementById(fn)) {
			if (elem.value == "1") {
				return true;
			}
		}
	}
	alert('You must select at least one field to include in the list before you can continue.');
	return false;
}
function checkGenerated( elem ) {
	if (elem.value != "1") {
		alert('You must generate the application before you can continue.');
		return false;
	}
	return true;
}