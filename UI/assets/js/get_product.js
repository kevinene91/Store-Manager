const product_form = document.getElementById('product_form')

const data = JSON.parse(localStorage.getItem('product'))

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


