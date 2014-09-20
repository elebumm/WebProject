<!-- SKALEZGAMES PRODUCTS CONTROLLER -->
    
$(document).ready(function() {
	getData();
});
	
function getData() {
	var path = 'products.rpgle';
	$.ajax({
		url: path,
		dataType: 'json',
		cache: false,
		success: renderData,
		error: errorAlert	
	});
}
	
function renderData(jsonData) {
	var template;
	var path = 'templates/products.tmpl';
	$.ajax({
		url: path,
		cache: false,
		success: function(source) {
			template = Handlebars.compile(source);
			$("body").html(template(jsonData));
			$('#tproducts').dataTable( { "sPaginationType": "full_numbers"} );
		},
		error: errorAlert	          
	});         
}
  
function errorAlert(ehr, reason, ex) {
	alert("Request was not successful: " + reason + ex);
}
