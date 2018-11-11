
const token = localStorage.getItem('access_token')
const access_token = "Bearer " + token

var logout = document.getElementsByClassName('dropdown-content')

logout[0].addEventListener('click', function(e){
  e.preventDefault()
  

fetch("https://store-manger.herokuapp.com/api/v2/auth/logout",{
	headers:{
		"Content-type":"application/json",
		'Access-Control-Allow-Origin':'*',
		'Access-Control-Request-Method': '*',
		"Authorization": access_token
	},
	method:"POST",
	mode:"cors",

	})
	.then(function(response){return response.json()})
	.then(function(response){
  

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
    localStorage.clear()
    window.location.href = "../../index.html"

	})
})




function shownav() {
  document.getElementById("mySidenav").style.width = "250px";
}

function closenav() {
  document.getElementById("mySidenav").style.width = "0";
}

role = localStorage.getItem('role')

const attendant_links = document.getElementsByClassName('attendant') 
const admin_links = document.getElementsByClassName('admin')


if (role == 'admin'){
for (var element=0; element<attendant_links.length; element++){

      attendant_links[element]['innerHTML'] = ''
    
	
     
}

}else{
for (let element=0; element<admin_links.length; element++){
    admin_links[element]['innerHTML'] = ''
   
  }
    

}