const save = document.getElementById('save')
save.addEventListener('click', postCategory)




if (token === null){
	window.location.href = "../../index.html"
}


function postCategory(e){
	e.preventDefault()

	let name = document.getElementById("name").value
	let description = document.getElementById("description").value 

const data = {
	name:name,
	description:description,
};



fetch("https://store-manger.herokuapp.com/api/v2/categories",{
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
			
			response.message = "category created"
			setTimeout(()=> {
				window.location.href = "category.html"
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

