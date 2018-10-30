const registrationForm = document.getElementByID('registaration-form')
registrationForm.addEventListner('submit', signUp)


function signUp(e){
	e.preventDefault()

	var email = document.getElementByID("username").value
	var username = document.getElementByID("email").value 
	var password = document.getElementByID("password").value
	var confirm_password = document.getElementByID("confirm_password").value
}

var data = {
	email:email,
	username:username,
	password:password,
	confirm_password:confirm_password
};


fetch("https://store-manger.herokuapp.com/api/v2/auth/signUp",{
	method:"POST",
	mode:"cors",
	headers:{
		"Content-type":"application/json";
		""
	}
});

