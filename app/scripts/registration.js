$( '#submit' ).click(function() {
	console.log("submitted form")
	createOrg();
});

// if form submission successful, display some sort of message
if (location.search == "?success"){
	$('#success').html("Registration Successful");
}


function createOrg(){
	var name = document.getElementById('name').value;
	var description = document.getElementById('description').value;
	var website = document.getElementById('website').value;
	var phone = document.getElementById('phone').value;
	var address = document.getElementById('address').value;
	var public_key = document.getElementById('public_key').value;
	var id = document.getElementById('id').value;

	var JSONObj = {};
	var contact_info = {};

	contact_info.website = website;
	contact_info.phone = phone;
	contact_info.address = address;

	JSONObj.name = name;
	JSONObj.description = description;
	JSONObj.contact_info = contact_info;
	JSONObj.public_key = public_key;
	JSONObj.id = id;

	console.log(JSON.stringify(JSONObj))
	$.ajax({
		type: "POST",
		contentType: "application/json",
		url: 'https://intense-escarpment-3682.herokuapp.com/organization',
		data: JSON.stringify(JSONObj),
		dataType: "json"
	})
	.fail(function() { 
		console.log("error in ajax post");
	})
	.success(function() {
		console.log("successful ajax post");
		location.search='success';
		
	})

	//alert('organization created');

	// var TestObject = Parse.Object.extend("TestObject");
	// var testObject = new TestObject();
	// testObject.save(JSONObj).then(function(object) {
	// 	console.log('succesfully pushed obj to parse');
	// })
}