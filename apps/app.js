$(function() {

	$('#search-term').submit(function(event) {
		$("#search-results p").remove();
		event.preventDefault();
		var searchTerm = $('#query').val();
		getRequest(searchTerm);
		
	});
});

// sends query to the server and gets data
function getRequest(searchTerm) {
	var params = {
		part: 'snippet',
		key: 'AIzaSyARq9syTNJnhY273QmIX2-oU9H7Fz2AcUI',
		q: searchTerm
	};
	url = 'https://www.googleapis.com/youtube/v3/search';

	$.getJSON(url, params, function(data) {
		//console.log(data);
		showResults(data.items);
	});
}

// creates the html for the videos
function showResults(myData) {
	$.each(myData, function(index, value) {
		console.log(value.snippet.description);
		//https://www.youtube.com/watch?v=albrXOyVGv0
		var hrefLink = "<a href=\"https://www.youtube.com/watch?v=" + getVideoId(value) + "\" target=\"_blank\">";
		var imgLink = "<img id=\"thumbnail-img\" src=\"" + value.snippet.thumbnails.default.url + "\">";
		$('#search-results').append("<p>" + hrefLink + imgLink + "</a></p>");
	});
}

// creates the html for embedding the videos into the webpage
function showResults_embed(myData) {
	$.each(myData, function(index, value) {
		console.log(value.snippet.description);
		//https://www.youtube.com/watch?v=albrXOyVGv0
		var hrefLink = "https://www.youtube.com/embed/" + getVideoId(value) ;
		var imgLink = "<img src=\"" + value.snippet.thumbnails.default.url + "\">";
		$('#search-results').append("<p><iframe width=\"200\" height=\"150\" src=\"" + hrefLink + "</iframe>" + imgLink + "</p>");
	});
}

// extract the video id given a datum
function getVideoId(myData) {
	return myData.id.videoId;
}

