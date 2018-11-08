const addSale = document.getElementById('add_products')

addSale.addEventListener('click', protectAdd)

function protectAdd(e){
	e.preventDefault()
	role = localStorage.getItem('role')

	if (role !== "admin"){

		let notification = document.getElementById('error-message')
		notification.innerHTML = `
		<div Id="error-message-item">
		<h2>unauthorized to add products</h2>
		</div>`
		;
		setTimeout(()=> {
			let message = "";
			notification.innerHTML = message;
		}, 3000)
	}else{
		window.location.href = "products_add.html"
	}

}

