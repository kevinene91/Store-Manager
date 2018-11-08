

var tex = document.querySelector('textarea.expand');

tex.addEventListener('keydown', resize);

// var logout = document.querySelector('Logout')

// logout.addEventListener('click', function(e){
//   e.preventDefault()
  

// fetch("https://store-manger.herokuapp.com/api/v2/auth/logout",{
// 	headers:{
// 		"Content-type":"application/json",
// 		'Access-Control-Allow-Origin':'*',
// 		'Access-Control-Request-Method': '*',
// 		"Authorization": access_token
// 	},
// 	method:"POST",
// 	mode:"cors",
// 	body: JSON.stringify(data)

// 	})
// 	.then(function(response){return response.json()})
// 	.then(function(response){
// 		if (response.message == undefined){
			
// 			response.message = "product created"
// 			setTimeout(()=> {
// 				window.location.href = "products.html"
// 			}, 3000)
			
// 		}

// 		let notification = document.getElementById('error-message')
// 		notification.innerHTML = `
// 		<div Id="error-message-item">
// 		<h2>${response.message}</h2>
// 		</div>`
// 		;
// 		setTimeout(()=> {
// 			let message = "";
// 			notification.innerHTML = message;
// 		}, 4000)

// 	})
// }

// })

function resize() {
  setTimeout(function() {
    tex.style.height = 'auto'; //needed when you remove content so we reduce the height
    tex.style.height = tex.scrollHeight + 'px';
  }, 0);
}

function shownav() {
  document.getElementById("mySidenav").style.width = "250px";
}

function closenav() {
  document.getElementById("mySidenav").style.width = "0";
}
