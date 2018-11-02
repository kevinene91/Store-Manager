
const token = localStorage.getItem('access_token')
const access_token = "Bearer " + token

if (token === null){
    window.location.href = "../../index.html"
}


window.onload = function getsingleProduct(){
    product_id = localStorage.getItem('product_id')
    console.log('ss')

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
            console.log(data)
            const product_form = document.getElementById('product_form')

            product_form.innerHTML= 
            `<div class="card-list">
                            <ul>
                            <h3> Information</h3> 
                            </ul>              
                            <ul>
                                <p class="title">Name</p>
                                <p id="name">${data['name']}</p>
                            </ul>  
                            
                            
                            <ul>
                                <p class="title">Description</p>
                                <p id="Description">${data['description']}</p>
                            </ul>
                                    
                        </div>
                    
                        <div class="card-list">
                            <ul>
                                <h3>Price</h3>
                            </ul>
                            <ul>
                                <p class="title">Price</p>
                                <p>${data['price']}</p>
                            </ul>
                        </div>
                    

                        <div class="endbar">
                        <div class="endbar-item">
                        <ul> <h3>Properties of </h3> </ul>

                            <ul>
                                <p class="title">Quantity</p>
                                <p>${data['quantity']}</p>
                            </ul>

                            <ul>
                                <p class="title">Minimum Inventory</p>
                                <p>${data['minimum_invetory']} Psc</p>
                            </ul>
                        </div>
                        
                </div>`;



            })

}

