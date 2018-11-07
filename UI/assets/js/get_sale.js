
const token = localStorage.getItem('access_token')
const access_token = "Bearer " + token

if (token === null){
    window.location.href = "../../index.html"
}

let detail = document.getElementById('detail')
    total = document.getElementById('total')
    attendant = document.getElementById('attendant')
    customer = document.getElementById('customer')
    date = document.getElementById('date')


window.onload = function getsingleProduct(){
    sale_id = localStorage.getItem('sale_id')

        fetch(`https://store-manger.herokuapp.com/api/v2/sales/${sale_id}`,{  
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
            sale = data['sale']
            sale_items = data['sale_items']
            sale_items.forEach(element => {
                detail.innerHTML=

                `
                <td></td>
                <td>${element['name']}</td>
                <td>${element['quantity']}</td>
                <td>${element['price']}</td>
                
                `
            total.innerHTML = `
            <td></td>
            <td></td>
            <td>Total</td>
            <td>${sale['total']}</td>
            `
            });
            attendant.innerHTML = `Name : ${sale['attendant_email']}`
            customer.innerHTML = `Name : ${sale['customer']}`
            date.innerHTML = `Date : ${sale['created_at']}`
            
            })
}

