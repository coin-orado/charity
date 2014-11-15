var 
$.getJSON( "https://intense-escarpment-3682.herokuapp.com/organization", function( data ) {
	console.log(data)
	$('#orgs').append("<ul id='list'></ul>");
    for (cnt = 0; cnt < data.length; cnt++) {
          $("#list").append("<li><a href=https://intense-escarpment-3682.herokuapp.com/organization/?id=" + data[cnt].id + ">" + data[cnt].name+"</a></li>");
    }
});