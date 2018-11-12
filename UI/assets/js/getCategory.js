


if (token === null){
    window.location.href = "../../index.html"
}

let name = document.getElementById('name')
    description = document.getElementById('description')
    price = document.getElementById('price')

window.onload = function getsingleCategory(){
    category_id = localStorage.getItem('category_id')

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
            
            name.innerHTML = data['name']
            description.innerHTML = data['description']

            })
}

