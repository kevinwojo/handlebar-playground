$(document).ready(function() {

	// Some bite-sized results
	var results = [
		{"title":['Canine Courageous'], "alias": "", "fulltext":"", "description":"2011 Guideposts article", "url":"https:\/\/127.0.0.1\/resources\/40339"},
		{"title":['National Canines Inspriing Reslience & Recovery in the Midst of Crisis'], "alias": "", "fulltext":"This is a mock fulltext entry.", "description":"This is a mock description", "url":"https:\/\/127.0.0.1\/resources\/40536"},
	];
	// Set the context 
	var context = {results};
	var template = $('#entry-template').html();
	
	// Create your own helpers!
	Handlebars.registerHelper('link', function(url,text) {
		url = url.replace("127.0.0.1", "kevdev.com");

		var result = '<a href="'+url+'">'+text+'</a>';
	
	  return new Handlebars.SafeString(result);
	});
	
	// Compile the template
	var compiled = Handlebars.compile(template);
	
	// Returns a callback to generate the HTML
	var html = compiled(context);
	
	// Append content to the container
	$('#entries').append(html);
	
});
