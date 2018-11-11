let = localStorage.getItem('role')

const dash_attendant_links = document.getElementsByClassName('dash-attendant') 
const dash_admin_links = document.getElementsByClassName('dash-admin')


if (role == 'admin'){
for (var element=0; element<dash_attendant_links.length; element++){
  console.log(dash_attendant_links[element]['innerHTML'])
  dash_attendant_links[element]['inrHTML'] = ''
  dash_attendant_links[element].remove()
  dash_attendant_links[element].remove()
 
     
}

}else{
for (let element=0; element<dash_admin_links.length; element++){
    dash_admin_links[element]['innerHTML'] = ''
    dash_admin_links[element].remove()
    dash_admin_links[element].remove()
    dash_admin_links[element].remove()
    dash_admin_links[element].remove()

  }
    

}