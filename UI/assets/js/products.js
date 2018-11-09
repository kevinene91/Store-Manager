const save = document.getElementById('save')
save.addEventListener('click', postProducts)

const token = localStorage.getItem('access_token')
const access_token = "Bearer " + token


if (token === null){
	window.location.href = "../../index.html"
}


function postProducts(e){
	e.preventDefault()

	let name = document.getElementById("name").value
	let description = document.getElementById("description").value 
	let price = document.getElementById("price").value
	let quantity = document.getElementById("quantity").value
	let minimum_inventory = document.getElementById("minimum_inventory").value

const data = {
	name:name,
	description:description,
	price:price,
	quantity:quantity,
	minimum_inventory: minimum_inventory

};



fetch("https://store-manger.herokuapp.com/api/v2/products",{
	headers:{
		"Content-type":"application/json",
		'Access-Control-Allow-Origin':'*',
		'Access-Control-Request-Method': '*',
		"Authorization": access_token
	},
	method:"POST",
	mode:"cors",
	body: JSON.stringify(data)

	})
	.then(function(response){return response.json()})
	.then(function(response){
		if (response.message == undefined){
			
			response.message = "product created"
			setTimeout(()=> {
				window.location.href = "products.html"
			}, 3000)
			
		}

		let notification = document.getElementById('error-message')
		notification.innerHTML = `
		<div Id="error-message-item">
		<h2>${response.message}</h2>
		</div>`
		;
		setTimeout(()=> {
			let message = "";
			notification.innerHTML = message;
		}, 4000)

	})
}

