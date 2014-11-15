$.getJSON( "https://intense-escarpment-3682.herokuapp.com/organization", function( data ) {
	console.log(data)
	$('#orgs').append("<ul id='list'></ul>");
    for (cnt = 0; cnt < data.length; cnt++) {
    	  var bullet = data[cnt].name;
    	  var link = "<li><a href='https://intense-escarpment-3682.herokuapp.com/organization.html?id=" + data[cnt].id + "'>" + bullet + "</a></li>";
          $("#list").append(link);
    }
});