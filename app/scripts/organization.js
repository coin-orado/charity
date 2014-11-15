function getQueryParams(search) {
	if (search == "")
		return 0;
	var params = {};
	var tmp = search.split('?')[1].split('=');
	var key = tmp[0];
	var val = tmp[1];
	params[key] = val;
    return params;
}

params = getQueryParams(window.location.search);
$.getJSON( "https://intense-escarpment-3682.herokuapp.com/organization/" + params.id, function( data ) {
	var orgContactInfo = "Address: " + data.contact_info.address + "<br>" + "Phone: " + data.contact_info.phone + "<br>" + "Website: " + data.contact_info.website;

	document.getElementById('orgName').innerHTML = data.name;
	document.getElementById('orgDesc').innerHTML = data.description;
 	document.getElementById('orgContactInfo').innerHTML = orgContactInfo;
 	document.getElementById('pubKey').innerHTML = data.public_key;
	console.log(data)
});