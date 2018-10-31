
let table_body = document.querySelector('tbody')



const token = localStorage.getItem('access_token')
const access_token = "Bearer " + token

if (token === null){
	window.location.href = "signin.html"
}

//  post the data to via fetch
fetch("https://store-manger.herokuapp.com/api/v2/products",{	
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
	

	for(var count=0; count < data.length; count++){

		console.log(data[count]['product_id'])
		let tr =  document.createElement('tr')
		tr.classList.add("detail")

		let td_img = document.createElement('td')
			td_name = document.createElement('td')
			td_price = document.createElement('td')
			td_quantity = document.createElement('td')
			td_name = document.createElement('td')
			td_description = document.createElement('td')
			td_edit = document.createElement('td')
			td_detail = document.createElement('td')
			td_delete = document.createElement('td')


		td_img.innerHTML = `<img class="wrapper" src="../assets/images/book.jpg">`
		td_name.innerHTML = data[count]['name']
		td_description.innerHTML = data[count]['description']
		td_quantity.innerHTML = data[count]['quantity']
		td_price.innerHTML = data[count]['price']
		td_edit.innerHTML = `<a href="product_edit.html"><i class="fas fa-edit"></i></a>`
		td_detail.innerHTML = `<a href="product_detail.html"><i class="fas fa-eye"></i></a>`
		td_delete.innerHTML = `<i class="fas fa-trash-alt"></i>`

		tr.appendChild(td_img)
		tr.appendChild(td_name)
		tr.appendChild(td_description)
		tr.appendChild(td_quantity)
		tr.appendChild(td_price)
		tr.appendChild(td_edit)
		tr.appendChild(td_detail)
		tr.appendChild(td_delete)
		table_body.appendChild(tr)

	}
})