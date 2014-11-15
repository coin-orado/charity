function getQueryParams(qs) {
    qs = qs.split("+").join(" ");

    var params = {}, tokens,
        re = /[?&]?([^=]+)=([^&]*)/g;

    while (tokens = re.exec(qs)) {
        params[decodeURIComponent(tokens[1])]
            = decodeURIComponent(tokens[2]);
    }

    return params;
}

console.log(params);
$.getJSON( "https://intense-escarpment-3682.herokuapp.com/organization/1", function( data ) {
  // var items = [];
  // $.each( data, function( key, val ) {
  //   items.push( "<li id='" + key + "'>" + val + "</li>" );
  // });
 
  // $( "<ul/>", {
  //   "class": "my-new-list",
  //   html: items.join( "" )
  // }).appendTo( "body" );
	var orgContactInfo = "Address: " + data.contact_info.address + "<br>" + "Phone: " + data.contact_info.phone + "<br>" + "Website: " + data.contact_info.website;

	document.getElementById('orgName').innerHTML = data.name;
	document.getElementById('orgDesc').innerHTML = data.description;
 	document.getElementById('orgContactInfo').innerHTML = orgContactInfo;
	console.log(data)
});