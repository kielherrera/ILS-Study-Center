var navbar_sections = document.querySelectorAll('#menu a');
var special_button = document.querySelectorAll('.logout_button');

special_button[0].addEventListener('mouseenter',function(){
    updateSelected(this);
});
special_button[0].addEventListener('mouseleave',function(){
    removeColorSelected(this);
});

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