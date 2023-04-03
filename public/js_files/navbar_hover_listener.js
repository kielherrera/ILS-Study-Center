var navbar_sections = document.querySelectorAll('#menu a');
var logout_button = document.querySelectorAll('.logout_button')[0];
var formToSubmit = document.getElementById('logout-form');

logout_button.addEventListener('mouseenter', function(){
    updateSelected(this);
})

logout_button.addEventListener('mouseleave', function(){
    removeColorSelected(this);
})

logout_button.addEventListener('click', function(){
    formToSubmit.submit();
})

for(let i = 0; i < navbar_sections.length; ++i){
    navbar_sections[i].addEventListener('mouseenter', function(){
        updateSelected(this);
    });
    
    navbar_sections[i].addEventListener('mouseleave', function(){
        removeColorSelected(this);
    });
}

function updateSelected(nav_item){
    nav_item.setAttribute('style','background-color: #3B45A3; color:white; width:230px');
}

function removeColorSelected(nav_item){
    nav_item.removeAttribute('style');
}