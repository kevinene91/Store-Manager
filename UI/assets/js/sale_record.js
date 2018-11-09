
let table_body = document.querySelector('tbody')

const token = localStorage.getItem('access_token')
const access_token = "Bearer " + token

if (token === null){
	window.location.href = "../../index.html"
}

	email = localStorage.getItem('email') 
//  post the data to via fetch
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

	for(var count=0; count < data.length-1; count++){

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
		td_detail.innerHTML = `<i class="fas fa-eye"></i>`;
		td_detail.id = data[count]['sale_id']
		td_delete.id = data[count]['sale_id']

		td_detail.addEventListener("click", function (e){
			e.preventDefault()
			window.location.href="sale_view.html"
			localStorage.setItem('sale_id', this.id)
			})
	
        tr.appendChild(spacing_id)
        tr.appendChild(td_id)
		tr.appendChild(td_customer)
		tr.appendChild(td_attendant)
		tr.appendChild(td_Total)	
		tr.appendChild(td_detail)
		table_body.appendChild(tr)

	}
})


  
