const sale = document.getElementById('sale')
sale.addEventListener('click', searchProducts)

const token = localStorage.getItem('access_token')
const access_token = "Bearer " + token
let form = document.getElementById('sale-form')

if (token === null){
	window.location.href = "../../index.html"
}

let name = document.getElementById('name')
	quantity = document.getElementById('quantity')
	customer = document.getElementById('customer')
	addItem = document.getElementById('save')
	complete = document.getElementById('complete')

loadList()

function loadList(){
	let allItems = getListItemsInStorage()

	prepoulateUI(allItems)
}


function searchProducts(e){
	
	e.preventDefault()
	let output = document.getElementById("search").value 

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

	

	if (data.message === undefined){
		data.message = "add quantity"
		addItem.addEventListener('click', addItemListToLocalStorage)
		localStorage.setItem('product', JSON.stringify(data))
		name.value = data['name']
	}

	let notification = document.getElementById('error-message')
		notification.innerHTML = `
		<div Id="error-message-item">
		<h2>${data.message}</h2>
		</div>`; 

		setTimeout(()=> {
			let message = "";
			notification.innerHTML = message;
		}, 4000)
})
}


function addItemListToLocalStorage(e){
	e.preventDefault()
	product = localStorage.getItem('product')
	quantityVal = quantity.value
	
	if (localStorage.getItem('items')===null){
		let items = []
	product_to_update = JSON.parse(product)
	product_to_update.product_quantity = quantityVal
	
	items.push(JSON.stringify(product_to_update))
	localStorage.setItem('items', JSON.stringify(items));
	}else{
	   items = JSON.parse(localStorage.getItem('items')) ;
        //push new item 
		product_to_update = JSON.parse(product)
		product_to_update.product_quantity = quantityVal
        items.push(JSON.stringify(product_to_update))

		localStorage.setItem('items', JSON.stringify(items)); 
	}

	window.location.reload()

}

function getListItemsInStorage(){
	let items; 

	if (localStorage.getItem('items')===null){
	  items = [];


	}else{
	  items = JSON.parse(localStorage.getItem('items'));
	}
	return items
}


function prepoulateUI(items){
	
tbody = document.getElementById('sale-detail')
let newItems = []
items.forEach(elem => {
	elem = JSON.parse(elem)
	newItems.push(elem)
});


newItems.forEach(item => {

	let itemsvalue = parseInt(item['product_quantity'])
		tr = document.createElement('tr')
		tr.id = parseInt(item['product_id'])
		td = document.createElement('td')
		tdName = document.createElement('td')
		tdprice = document. createElement('td')
		tdId = document.createElement('td')
		tdquantity = document.createElement('td')
		td_delete = document.createElement('td')
		tdName.innerHTML = `${item['name']}`
		tdprice.innerHTML = `${item['price']}`
		tdquantity.innerHTML = `${itemsvalue}`
		tdId.innerHTML = `${item['product_id']}`
		td_delete.innerHTML = `<i class="fas fa-trash-alt"></i>`
		td_delete.id = parseInt(item['product_id'])
		td_delete.addEventListener('click', deleteProductItem)

	tr.appendChild(td)
	tr.appendChild(tdId)
	tr.appendChild(tdName)
	tr.appendChild(tdquantity)
	tr.appendChild(tdprice)
	tr.appendChild(td_delete)
	tbody.appendChild(tr)
	
	

});

}

function deleteProductItem(e){
	e.preventDefault()
	id = this.id
	let items = JSON.parse(localStorage.getItem('items'));

	items.forEach(function(item, index){
		  items.splice(index, 1);
	});
	localStorage.setItem('items', JSON.stringify(items));

	window.location.reload()
}

complete.addEventListener('click', postSales)

function postSales(e){
	e.preventDefault()

	let allItems = getListItemsInStorage()
		itemsList = []
		sales = []
	allItems.forEach(item =>{
		new_item = JSON.parse(item)
		itemsList.push(new_item)
		console.log(new_item['product_id'])
	});

	itemsList.forEach(sale =>{
	
		sale_item = {product_id: parseInt(sale['product_id']), quantity:parseInt(sale['product_quantity'])}
		sales.push(sale_item)
	})

			data = {
			sale_items:sales, 
			customer: "kevin"
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

				response.message = "Sale created"
				setTimeout(()=> {
					let sale_id = response[0]['sale_id']
					localStorage.setItem('sale_id', sale_id)
					localStorage.removeItem('items')
					window.location.href = "sale_view.html"

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

}


		