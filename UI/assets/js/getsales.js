
let table_body = document.querySelector('tbody')

const token = localStorage.getItem('access_token')
const access_token = "Bearer " + token

if (token === null){
	window.location.href = "../../index.html"
}

let saveBtn = document.getElementsByClassName('save')[0]
let cancel = document.getElementsByClassName('cancel')[0]

//  post the data to via fetch
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
		td_detail.id = data[count]['sale_id']
		td_delete.id = data[count]['sale_id']
		saveBtn.id = data[count]['sale_id']

		td_detail.addEventListener("click", function (e){
			e.preventDefault()
			window.location.href="sale_view.html"
			localStorage.setItem('sale_id', this.id)
			})
		td_delete.addEventListener("click", modalCall)
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

let modal = document.getElementById('myModal');
let btn = document.getElementById("myBtn");
let span = document.getElementsByClassName("close")[0];

function modalCall(e) {
	e.preventDefault()
    modal.style.display = "block";
     
    sale_id = this.id


        saveBtn.addEventListener('click', function(e){
        fetch(`https://store-manger.herokuapp.com/api/v2/sales/${sale_id}`,{
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin':'*',
                'Access-Control-Request-Method': '*',
                'Authorization': access_token
            },
            method:"delete",
            mode: "cors", 
            }).then(function(response){return response.json()})
            .then(function(response){
				let notification = document.getElementById('error-message')
				notification.innerHTML = `
				<div Id="error-message-item">
				<h2>${response.message}</h2>
				</div>`
				;
				setTimeout(()=> {
					modal.style.display = "none"
				}, 2000)
				setTimeout(()=> {
					let message = "";
					notification.innerHTML = message;
					modal.style.display = "none"
				}, 4000)
				window.location.reload()

            })
		})
	   

		cancel.addEventListener('click', function(e){
		e.preventDefault()
			modal.style.display = "none";        	

		})
}


span.onclick = function() {
    modal.style.display = "none";
}


window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";

}
}
