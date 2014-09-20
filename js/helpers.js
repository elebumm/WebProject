<!-- Handlebars Helpers-->

Handlebars.registerHelper('formatCurrency', function(number) {
	return "$" + number.toFixed(2).toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
});

Handlebars.registerHelper("formatPhoneNumber", function(phoneNumber) {
	phoneNumber = phoneNumber.toString();
	return "(" + phoneNumber.substr(0,3) + ") " + phoneNumber.substr(3,3) + "-" + phoneNumber.substr(6,4);
});
