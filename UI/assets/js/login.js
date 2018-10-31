// get the button to submit the query 
var submit = document.getElementById("submit")
//  add eventListener on the button
submit.addEventListener('click', loginFunction)

// implement the call back function
function loginFunction(e){
	e.preventDefault()
	var email = document.getElementById("email").value 
	var password = document.getElementById("password").value

	//  the data to post 
	var data = {
	email:email,
	password:password,
	};

	//  post the data to via fetch
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
		localStorage.setItem('role', response.role)
		if (response.message === "logged in"){
			// redirect to dashboard
			window.location.href = 'UI/templates/dashboard.html'
		}
		else{
			let notification = document.getElementById('error-message')
			notification.innerHTML = `
			<div id="error-message-item">
			<h2>${response.message}</h2>
			</div>`;
			setTimeout(()=> {
				const message = "";
				notification.innerHTML = message;
			}, 8000)
			

		}

	})
}
