const sale = document.getElementById('sale')
sale.addEventListener('click', searchProducts)

const token = localStorage.getItem('access_token')
const access_token = "Bearer " + token


if (token === null){
	window.location.href = "../../index.html"
}




function searchProducts(e){
	e.preventDefault()
	let output = document.getElementById("search").value 
	let form = document.getElementById('sale-form')
	
	fetch(`https://store-manger.herokuapp.com/api/v2/search/${output}`,{	
	headers: {
		'Content-Type': 'application/json',
		'Access-Control-Allow-Origin':'*',
		'Access-Control-Request-Method': '*'
	},
	method:"GET",
	mode: "cors", 	
	})
.then(function(response){return response.json()})
.then(function(data){

	let product_ul = document.createElement('ul')
		product_label = document.createElement('label')
		product_input = document.createElement('input')

		product_label.innerHTML = 'Product'
		product_input.type = "text"
		product_input.value = `${data['name']}`
		product_ul.appendChild(product_label)
		product_ul.appendChild(product_input)


	let quantity_ul = document.createElement('ul')
		quantity_label = document.createElement('label')
		quantity_input = document.createElement('input')
		quantity_label.innerHTML = 'quantity'
		quantity_input.type = "number"
		quantity_input.id = 'quantityID'
		quantity_ul.appendChild(quantity_label)
		quantity_ul.appendChild(quantity_input)


	let price_ul = document.createElement('ul')
		price_label = document.createElement('label')
		price_input = document.createElement('input')
		price_label.innerHTML = 'Price'
		price_input.type = "number"
		price_input.value = `${data['price']}`
		price_ul.appendChild(price_label)
		price_ul.appendChild(price_input)


	
	let customer_ul = document.createElement('ul')
		customer_label = document.createElement('label')
		customer_input = document.createElement('input')
		customer_label.innerHTML = 'Customer'
		customer_input.type = "text"
		customer_input.id = 'nameID'
		customer_ul.appendChild(customer_label)
		customer_ul.appendChild(customer_input)

		console.log(customer_ul)
	let button_ul = document.createElement('ul')
		button = document.createElement('button')
		button.className = 'save'
		button.id = 'add'
		button.innerHTML = 'Sell'
		button_ul.appendChild(button)

	let space_ul = document.createElement('ul')


	form.appendChild(product_ul)
	form.appendChild(customer_ul)
	form.appendChild(quantity_ul)
	form.appendChild(product_ul)
	form.appendChild(space_ul)
	form.appendChild(button_ul)

	var addItem =  document.getElementById('add')
	var quantity = document.getElementById('quantityID')
	var name = document.getElementById("nameID")

	quantityValue = quantity.addEventListener('change',function(e){
		value = event.target.value;
		localStorage.setItem('quantity', value)
	})


	name.addEventListener('change',function(e){
		value = event.target.value;
		localStorage.setItem('name', value)
	})

	console.log(quantityValue)
    addItem.addEventListener('click', function(e){
                     	e.preventDefault()

					quantityValue = localStorage.getItem('quantity')
					nameValue = localStorage.getItem('name')
					console.log(quantityValue)

                     data = {
                     	sale_items:[{product_id:data['product_id'], quantity:parseInt(quantityValue)}], 
                     	customer: nameValue
                     }

                     

                    fetch('https://store-manger.herokuapp.com/api/v2/sales',{
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
			
							response.message = " created"
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
						}, 3000)
						

                     	})
                     })

                })
	
}
