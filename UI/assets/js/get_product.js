


if (token === null){
    window.location.href = "../../index.html"
}

let name = document.getElementById('name')
    description = document.getElementById('description')
    price = document.getElementById('price')
    quantity = document.getElementById('quantity')
    minimum = document.getElementById('minimum')


window.onload = function getsingleProduct(){
    product_id = localStorage.getItem('product_id')

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
            
            name.innerHTML = data['name']
            description.innerHTML = data['description']
            quantity.innerHTML = data['quantity']
            minimum.innerHTML = data['minimum_inventory']
            price.innerHTML = data['price']
            
            })
}

