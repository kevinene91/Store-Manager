const product_form = document.getElementById('product_form')


const data = JSON.parse(localStorage.getItem('product'))

console.log(data["name"])



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
            </div>`;



