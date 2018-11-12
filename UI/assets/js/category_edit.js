

const save = document.getElementById('save')


if (token === null){
    window.location.href = "../../index.html"
}

  let name = document.getElementById("name")
      description = document.getElementById("description")
 
      category = localStorage.getItem('category')
      category = JSON.parse(category)


window.onload = function preFill(e){
    name.value = category['name']
    description.value = category['description']
   
}


save.addEventListener('click', editProduct)


function editProduct(e){
    e.preventDefault()

    const data = {
        name:name.value,
        description:description.value,

       }

    category_id = parseInt(category['category_id'])

    

        fetch(`https://store-manger.herokuapp.com/api/v2/category/${category_id}`,{
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
            
            response.message = "category edited"
            setTimeout(()=> {
                window.location.href = "category.html"
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
