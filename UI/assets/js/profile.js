

if (token === null){
	window.location.href = "../../index.html"
}

let email = localStorage.getItem('email') 
	mymail = document.getElementById('mymail')
	nameval = document.getElementById('thename')
	role = document.getElementById('role')
	
	sales = document.getElementById('sales')
	total = document.getElementById('total')

window.onload = fetch(`https://store-manger.herokuapp.com/api/v2/sales/${email}`,{	
headers: {
	'Content-Type': 'application/json',
	'Access-Control-Allow-Origin':'*',
	'Access-Control-Request-Method': '*',
	'Authorization': access_token
},
method:"GET",
mode: "cors", 	
})
.then(function(response){return response.json()})
.then(function(data){
	let length = data.length
	position = length - 1
	profile = data[position]
	console.log(profile)
	userRole = localStorage.getItem('role')
	console.log(role)

	nameval.innerHTML = `${profile['user']}`
	role.innerHTML = `${userRole}`
	mymail.innerHTML = `${email}`
	total.innerHTML = `${profile['total']}`
	sales.innerHTML = `${profile['total_sales']}`
	


})
