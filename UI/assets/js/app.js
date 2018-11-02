

var tex = document.querySelector('textarea.expand');

tex.addEventListener('keydown', resize);

var tex = document.querySelector('Logout')

tex.addEventListener('click', function(e){
  e.preventDefault()
  console.log('click')
})

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
