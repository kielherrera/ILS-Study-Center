var navbar_sections = document.querySelectorAll('#menu a');
var logout_button = document.querySelectorAll('.logout_button')[0];

logout_button.addEventListener('mouseenter', function(){
    updateSelected(this);
})

logout_button.addEventListener('mouseleave', function(){
    removeColorSelected(this);
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
    nav_item.setAttribute('style','background-color: #3B45A3; color:white');
}

function removeColorSelected(nav_item){
    nav_item.removeAttribute('style');
}