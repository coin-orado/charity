$.getJSON( "https://intense-escarpment-3682.herokuapp.com/organization", function( data ) {
	console.log(data)
	$('#orgs').append("<ul id='list'></ul>");
    for (cnt = 0; cnt < data.length; cnt++) {
          $("#list").append("<li>"+data[cnt].name+"</li>");
    }
});