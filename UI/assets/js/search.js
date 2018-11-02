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

	let ul = document.createElement('ul')
		label = document.createElement('label')
		input = document.createElement('input')

		label.innerHTML = 'Product'
		input.type = 

		console.log(label)




	form.innerHTML = `<ul><label>Product <label> 
                    <input type="text" value="${data['name']}">
                    </ul>

                    <ul><label>Price<label> 
                    ${data['price']}
                    </ul>
                  
                    <ul>
                    <label>Quantity</label>
                    <input type="number" id="quantity">
                    </ul>

                     <ul>
                    <label>Customer</label>
                    <input type="text", id="name">
                    </ul>

                    <ul>
                    <button class="save" id="add">Sell</button>
                    <ul>`

                     const addItem =  document.getElementById('add')
                     const quantity = document.getElementById('quantity').value
                     const name = document.getElementById("name").value
                     console.log(name)

                     addItem.addEventListener('click', function(e){
                     	e.preventDefault()

                     data = {
                     	sale_items:[{product_id:data['product_id'], quantity:1}], 
                     	customer: "kevin"
                     }

                     console.log(JSON.stringify(data))

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
						console.log(response)

                     	})
                     })

                })
	
}
