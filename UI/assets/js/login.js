// get the button to submit the query 
let submit = document.getElementById("submit")
//  add eventListener on the button
submit.addEventListener('click', loginFunction)

let role = localStorage.getItem('role')
let intro = document.getElementById('intro')
let button = document.getElementById('button')

if (role=="admin"){
	intro.innerHTML = "Create an attendant account"	
	button.innerHTML = `<a href="UI/templates/signup.html">
	<button> REGISTER </button></a>`
}else{
	intro.innerHTML = "Welcome! Login to Continue"
}

// implement the call back function
function loginFunction(e){
	e.preventDefault()
	let email = document.getElementById("email").value 
	let password = document.getElementById("password").value

	//  the data to post 
	const data = {
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
			localStorage.setItem('email', email)
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
			}, 3000)
		}

	})
}
