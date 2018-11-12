// get signup button
let submit = document.getElementById('submit')
submit.addEventListener('click', signUp)

//  the call back function for signUp
function signUp(e){
	e.preventDefault()

	var username = document.getElementById("username").value
	var email = document.getElementById("email").value 
	var password = document.getElementById("password").value
	var confirm_password = document.getElementById("confirm_password").value


var data = {
	email:email,
	username:username,
	password:password,
	confirm_password:confirm_password
};

const token = localStorage.getItem('access_token')
const access_token = "Bearer " + token

if (token === null){
	window.location.href = "../../index.html"
}



fetch("https://store-manger.herokuapp.com/api/v2/auth/signup",{
	headers:{
		"Content-type":"application/json",
		'Access-Control-Allow-Origin':'*',
		'Access-Control-Request-Method': '*',
		"Authorization": access_token
	},
	method:"POST",
	mode:"cors",
	body: JSON.stringify(data)

	}).then(function(response){return response.json()})
	.then(function(response){
		if (response.message === "registration sucessfull"){
			// redirect to dashboard
			window.location.href = '../../index.html'
		}
		else{
			let notification = document.getElementById('error-message')
			notification.innerHTML = `
			<div Id="error-message-item">
			<h2>${response.message}</h2>
			</div>`
			;
			setTimeout(()=> {
				let message = "";
				notification.innerHTML = message;
			}, 8000)
			

		}

	})
}