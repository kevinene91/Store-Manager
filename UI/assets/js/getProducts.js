

let table_body = document.querySelector('tbody')

const token = localStorage.getItem('access_token')
const access_token = "Bearer " + token

if (token === null){
	window.location.href = "../../index.html"
}

let saveBtn = document.getElementsByClassName('save')[0]
let cancel = document.getElementsByClassName('cancel')[0]
	
//  post the data to via fetchwi

window.onload = function allProducts(){


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
			td_detail = document.createElement('a')
			td_det = document.createElement('td')
	
		td_img.innerHTML = `<img class="wrapper" src="../assets/images/book.jpg">`
		td_name.innerHTML = data[count]['name']
		td_description.innerHTML = data[count]['description']
		td_quantity.innerHTML = data[count]['quantity']
		td_price.innerHTML = data[count]['price']
		td_edit.innerHTML = `<a href="product_edit.html"><i class="fas fa-edit"></i></a>`
		td_delete.innerHTML = `<i class="fas fa-trash-alt"></i>`
		td_detail.innerHTML = `<i class="fas fa-eye"></i>`;
		td_detail.id = data[count]['product_id']
		td_edit.id = data[count]['product_id']
		td_delete.id = data[count]['product_id']
		saveBtn.id = data[count]['product_id']
	
		// console.log(edit[0])	
		td_detail.addEventListener("click", function (e){
		e.preventDefault()
		window.location.href="product_detail.html"
		localStorage.setItem('product_id', this.id)
		})
		td_edit.addEventListener("click", function (e){
		e.preventDefault()
		
		product_id = this.id
		fetch(`https://store-manger.herokuapp.com/api/v2/products/${product_id}`,{  
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
            window.location.href="product_edit.html"
		})
           })

		td_delete.addEventListener("click", modalCall)
	
		td_det.appendChild(td_detail)
		tr.appendChild(td_img)
		tr.appendChild(td_name)
		tr.appendChild(td_description)
		tr.appendChild(td_quantity)
		tr.appendChild(td_price)
		tr.appendChild(td_det)
		tr.appendChild(td_edit)
		tr.appendChild(td_delete)
		table_body.appendChild(tr)
	
	}
})

}


let modal = document.getElementById('myModal');
let btn = document.getElementById("myBtn");
let span = document.getElementsByClassName("close")[0];


function modalCall(e) {
	e.preventDefault()
    modal.style.display = "block";
     
    product_id = this.id
      console.log(product_id)

        saveBtn.addEventListener('click', function(e){
        fetch(`https://store-manger.herokuapp.com/api/v2/products/${product_id}`,{
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
