

let table_body = document.querySelector('tbody')


if (token === null){
	window.location.href = "../../index.html"
}

let saveBtn = document.getElementsByClassName('save')[0]
let cancel = document.getElementsByClassName('cancel')[0]


window.onload = function allCategories(){


fetch("https://store-manger.herokuapp.com/api/v2/categories",{
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

		let td_name = document.createElement('td')
			td_description = document.createElement('td')
			td_edit = document.createElement('td')
            td_delete = document.createElement('td')
            td = document.createElement('td')
	
		td_name.innerHTML = data[count]['name']
		td_description.innerHTML = data[count]['description']
		td_edit.innerHTML = `<a href="product_edit.html"><i class="fas fa-edit"></i></a>`
		td_delete.innerHTML = `<i class="fas fa-trash-alt"></i>`
		td_edit.id = data[count]['category_id']
		td_delete.id = data[count]['category_id']
		saveBtn.id = data[count]['category_id']
	
		
		if (role == "admin"){
			td_edit.addEventListener("click", function (e){
				e.preventDefault()
				
				category_id = this.id
				fetch(`https://store-manger.herokuapp.com/api/v2/category/${category_id}`,{  
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
					localStorage.setItem('category', JSON.stringify(data))
					window.location.href="category_edit.html"
				})
				   })
		}else{
			td_edit.addEventListener('click', function(e){

			e.preventDefault()
			message = "unauthorized to perform function"
			let notification = document.getElementById('error-message')
			notification.innerHTML = `
			<div Id="error-message-item">
			<h2>${message}</h2>
			</div>`;
			setTimeout(()=> {
				let message = "";
				notification.innerHTML = message;
			}, 3000)
			})
		}
	
		
		
		if (role == "admin"){
			td_delete.addEventListener("click", modalCall)
		}else{
			td_delete.addEventListener("click", function(e){
			e.preventDefault()
			message = "unauthorized to perform function"
			let notification = document.getElementById('error-message')
			notification.innerHTML = `
			<div Id="error-message-item">
			<h2>${message}</h2>
			</div>`;
			setTimeout(()=> {
				let message = "";
				notification.innerHTML = message;
			}, 4000)
			})
			
}
		
	
        tr.appendChild(td)
		tr.appendChild(td_name)
		tr.appendChild(td_description)
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
     
    category_id = this.id
      console.log(category_id)

        saveBtn.addEventListener('click', function(e){
		if(role=="admin"){
			fetch(`https://store-manger.herokuapp.com/api/v2/category/${category_id}`,{
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
		}
		
       
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
