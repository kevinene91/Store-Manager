
let table_body = document.querySelector('tbody')


if (token === null){
	window.location.href = "../../index.html"
}

let saveBtn = document.getElementsByClassName('save')[0]
let cancel = document.getElementsByClassName('cancel')[0]

//  post the data to via fetch
window.onload = fetch("https://store-manger.herokuapp.com/api/v2/users",{	
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
			td_role = document.createElement('td')
			td_attendant = document.createElement('td')
			td_user = document.createElement('td')
			td_delete = document.createElement('td')
		
        if (data[count]['role']== 1){
            user_role = "Store attendant"
        }else{
            user_role = "Admin"
        }

		td_user.innerHTML = data[count]['name']
        td_role.innerHTML = `${user_role}`
        td_attendant.innerHTML = data[count]['email']
		td_delete.innerHTML = `<i class="fas fa-trash-alt"></i>`
		td_delete.id = data[count]['user_id']
		saveBtn.id = data[count]['user_id']
		td_delete.addEventListener("click", modalCall)
        tr.appendChild(spacing_id)
		tr.appendChild(td_user)
		tr.appendChild(td_attendant)
		tr.appendChild(td_role)	
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
     
    user_id = parseInt(this.id)



        saveBtn.addEventListener('click', function(e){
        fetch(`https://store-manger.herokuapp.com/api/v2/users/${user_id}`,{
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
