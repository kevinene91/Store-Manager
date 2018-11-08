
const token = localStorage.getItem('access_token')
const access_token = "Bearer " + token
const save = document.getElementById('save')


if (token === null){
    window.location.href = "../../index.html"
}

  let name = document.getElementById("name")
      description = document.getElementById("description")
      price = document.getElementById("price")
      quantity = document.getElementById("quantity")
      minimum_inventory = document.getElementById("minimum_inventory")
      product = localStorage.getItem('product')
      product = JSON.parse(product)


window.onload = function preFill(e){
    name.value = product['name']
    description.value = product['description']
    quantity.value = parseInt(product['quantity'])
    minimum_inventory.value = parseInt(product['minimum_inventory'])
    price.value = parseInt(product['price'])

}


save.addEventListener('click', editProduct)


function editProduct(e){
    e.preventDefault()

    const data = {
        name:name.value,
        description:description.value,
        price:price.value,
        quantity:quantity.value,
        minimum_inventory: minimum_inventory.value
       }

    product_id = parseInt(product['product_id'])

    

        fetch(`https://store-manger.herokuapp.com/api/v2/products/${product_id}`,{
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin':'*',
                'Access-Control-Request-Method': '*',
                'Authorization': access_token
            },
            method:"put",
            mode: "cors",  
            body: JSON.stringify(data)

            }).then(function(response){return response.json()})
            .then(function(response){
            if (response.message == undefined){
            
            response.message = "product edited"
            setTimeout(()=> {
                window.location.href = "products.html"
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
