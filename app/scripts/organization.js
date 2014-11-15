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

if (params['error'] == true){
	$('#error').html("Organization not found");
}

$.getJSON( "https://intense-escarpment-3682.herokuapp.com/organization/" + params.id, function(data) {
	
	.fail(function() { 
		console.log("error in ajax post");
		window.location.search = "error=true"
	})
	.success(function() {
		console.log("successful ajax post");
		var orgContactInfo = "Address: " + data.contact_info.address + "<br>" + "Phone: " + data.contact_info.phone + "<br>" + "Website: " + data.contact_info.website;
		var stats = "Maximum Gift: " + data.payment_status.max + "<br>" + "Total Contribution: " + data.payment_status.total + "<br>" + "Number of Contributions: " + data.payment_status.count;
			
		document.getElementById('orgName').innerHTML = data.name;
		document.getElementById('orgDesc').innerHTML = data.description;
		document.getElementById('orgContactInfo').innerHTML = orgContactInfo;
		document.getElementById('pubKey').innerHTML = data.public_key;
		document.getElementById('stats').innerHTML = stats;
		console.log(data)
		
	})
});