$(document).ready(function() {

var SearchPage = {
	//
	// Uses Handlebars.js to render the search results
	//
	renderResults: function(results) {
		// Set the context 
		var context = {results};
		var template = $('#result-template').html();
		
		// Create your own helpers!
		Handlebars.registerHelper('link', function(url,text) {

			if (text != url) {
				url = url.replace("127.0.0.1", "kevdev.com");
			}
			else {
				url = url.replace("127.0.0.1", "kevdev.com");
				text = url;
			}

			var result = '<a href="'+url+'">'+text+'</a>';
		
		  return new Handlebars.SafeString(result);
		});
		
		// Compile the template
		var compiled = Handlebars.compile(template);
		
		// Returns a callback to generate the HTML
		var html = compiled(context);
		
		// Append content to the container
		$('#results').append(html);
	},

	//
	// Performs the query
	//
	sendQuery: function() {
		// Make a promise, get results.
		// Some bite-sized results
		this.results = [
			{"title":['Canine Courageous'], "alias": "", "fulltext":"", "description":"2011 Guideposts article", "url":"https:\/\/127.0.0.1\/resources\/40339", "tags":['test','canine', 'dog', 'behavior']},
			{"title":['National Canines Inspriing Reslience & Recovery in the Midst of Crisis'], "alias": "", "fulltext":"This is a mock fulltext entry.", "description":"This is a mock description", "url":"https:\/\/127.0.0.1\/resources\/40536"},
		];

		return this.results;
	},

	//
	// Uses Handlebars.js to render the filters
	//
	renderFilters: function(results) {

		// Types
		 // interval - creates two inputs to perform a "Between" search
		 // exact - only create one input for performing an 'Equal to' search
		var filters = [
			{'name':'By Type', 'field': 'hubtype', 'values':['resource','citation','publication','member']},
			{'name':'Month', 'field': 'month', 'type':'date', 'values':moment.months('MMMM')},
			{'name':'Year', 'field': 'year', 'type':'interval'},
			{'name':'Day', 'field': 'day', 'type': 'interval'},
		];

		// Generate link which applies filter 
		Handlebars.registerHelper('apply-filter', function(filter) {
			var values = filter.values;
			var queryURL = 'https://kevdev.com?terms=canine';

			var html = '<ul>';
			for (i=0; i < values.length; i++) {
				html += '<li>' + '<a href="'+queryURL+'&filterby='+filter.field+'&filter='+values[i]+'">'+values[i]+'</a></li>';
			}
			html += '</ul>';

		  return new Handlebars.SafeString(html);
		});

		// Set the context 
		var context = {filters};
		var template = $('#filter-template').html();
		
		// Compile the template
		var compiled = Handlebars.compile(template);
		
		// Returns a callback to generate the HTML
		var html = compiled(context);
		
		// Append content to the container
		$('#results').append(html);
	},
}

	var results = SearchPage.sendQuery();
	SearchPage.renderResults(results);
	SearchPage.renderFilters(results);
});
