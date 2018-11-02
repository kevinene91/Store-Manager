

let table_body = document.querySelector('tbody')


const token = localStorage.getItem('access_token')
const access_token = "Bearer " + token

if (token === null){
	window.location.href = "../../index.html"
}

//  post the data to via fetchwi
window.onload = fetch("https://store-manger.herokuapp.com/api/v2/sales",{	
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
    console.log(data)
	

	for(var count=0; count < data.length; count++){

		let tr =  document.createElement('tr')
		tr.classList.add("detail")

        let spacing_id = document.createElement('td')
            td_id = document.createElement('td')
			td_customer = document.createElement('td')
			td_attendant = document.createElement('td')
			td_Total = document.createElement('td')
			td_detail = document.createElement('td')
			td_delete = document.createElement('td')
		

		td_id.innerHTML = data[count]['sale_id']
		td_customer.innerHTML = data[count]['customer']
        td_Total.innerHTML = data[count]['total']
        td_attendant.innerHTML = data[count]['attendant_email']
		td_delete.innerHTML = `<i class="fas fa-trash-alt"></i>`
		td_detail.innerHTML = `<i class="fas fa-eye"></i>`;
		// console.log(edit[0])	
		td_detail.addEventListener("click", function(e){
			// localStorage.setItem(td_detail.href)
			// window.location.href = "product_detail.ht"


		fetch(`https://store-manger.herokuapp.com/api/v2/products/${sale_id}`,{	
			headers: {
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin':'*',
				'Access-Control-Request-Method': '*',
				'Authorization': access_token
			},
			method:"GET",
			mode: "cors", 	
			}).then(function(response){return response.json()})
			.then(function(data){
        
				
				localStorage.setItem('product', JSON.stringify(data))
				window.location.href = "sale_detail.html"
			})

        })
        tr.appendChild(spacing_id)
        tr.appendChild(td_id)
		tr.appendChild(td_customer)
		tr.appendChild(td_attendant)
		tr.appendChild(td_Total)
		tr.appendChild(td_detail)
		tr.appendChild(td_delete)
		table_body.appendChild(tr)


	}
})
