//SKALEZGAMES PRODUCTS CONTROLLER
    
$(document).ready(function() {
	getData();
});
	
function getData() {
	var path = 'products.json';
	$.ajax({
		url: path,
		dataType: 'json',
		//type: 'post',
		cache: false,
		success: renderData,
		error: errorAlert	
	});
}
	
function renderData(jsonData) {
	var template;
	var path = 'products.tmpl';
	$.ajax({
		url: path,
		cache: false,
		success: function(source) {
			template = Handlebars.compile(source);
			$('#productstmpl').html(template(jsonData));
			$('#tproducts').dataTable( { "sPaginationType": "full_numbers", "bProcessing": true} );
		},
		error: errorAlert	          
	});         
}
  
function errorAlert(ehr, reason, ex) {
	alert("Request was not successful: " + reason + ex);
}
