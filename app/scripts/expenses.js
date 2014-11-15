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
console.log(params)
if (window.location.search == "?error"){
	$('#error').html("Organization not found");
}else{
	$.getJSON( "https://intense-escarpment-3682.herokuapp.com/organization/" + params.id, function(data) {
		console.log("successful ajax post");
			document.getElementById('orgName').innerHTML = data.name;
		}).done(function(){
			console.log("ajax successful");
		}).fail(function() { 
			console.log("error in ajax post");
			window.location.search = "error"
	});

	$.getJSON( "https://intense-escarpment-3682.herokuapp.com/expenses/" + params.id, function(data) {
		console.log("successful ajax post");
			var items = data.items;
			$('#expenses').append("<ul id='list'></ul>");
    		for (cnt = 0; cnt < data.length; cnt++) {
    	 		var expense = "<li>Id: "+ items[cnt].id + " paid public address: " + items[cnt].publicAddr + " tagged as: " + items[cnt].paid_to_name + "</li>";
          		$("#list").append(link);
    		}
    		id: orgId,
		paid_to: publicAddr,
		paid_to_name: getNameForPublicKey(publicAddr)
			
		}).done(function(){
			console.log("ajax successful");
		}).fail(function() { 
			console.log("error in ajax post");
			window.location.search = "error"
	});
}
		
