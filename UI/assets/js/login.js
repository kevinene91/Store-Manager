var submit = document.getElementById("submit")
submit.addEventListener('click', loginFunction)

function loginFunction(e){
	e.preventDefault()
	var email = document.getElementById("email").value 
	var password = document.getElementById("password").value


	var data = {
	email:email,
	password:password,
	};


	fetch("https://store-manger.herokuapp.com/api/v2/auth/login",{
	headers: {
		'Content-Type': 'application/json',
		'Access-Control-Allow-Origin':'*',
		'Access-Control-Request-Method': '*'
	},
	method:"POST",
	mode: "cors", 	
	body: JSON.stringify(data)

	}).then(function(response){return response.json()})
	.then(function(response){
		localStorage.setItem('access_token', response.access_token)
		if (response.message == "logged in"){
			window.location.href = 'UI/templates/dashboard.html'
		}
	})
}
