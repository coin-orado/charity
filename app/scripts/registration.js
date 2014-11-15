
$( '#submit' ).click(function() {
	alert("function called");
	createOrg();
});


function createOrg(){
	var name = document.getElementById('name');
	var description = document.getElementById('description');
	var website = document.getElementById('website');
	var phone = document.getElementById('phone');
	var address = document.getElementById('address');
	var public_key = document.getElementById('public_key');

	var JSONObj = {};
	var contact_info = {};

	contact_info.website = website;
	contact_info.phone = phone;
	contact_info.address = address;

	JSONObj.name = name;
	JSONObj.description = description;
	JSONObj.contact_info = contact_info;
	JSONObj.public_key = public_key;

	console.log(JSONObj)
}