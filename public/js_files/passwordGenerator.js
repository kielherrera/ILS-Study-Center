const firstName = document.getElementById('fName');
const lastName = document.getElementById('lName');
const password = document.getElementById('password');

console.log(firstName)

const generatePasswordButton = document.getElementById('gen_pass');


generatePasswordButton.addEventListener('click', function(){
    
    if(firstName.value.length == 0 || lastName.value.length == 0){
        alert('In order to use this feature, both First Name and Last Name should have values')
    }

    else{
        let passwordValue = firstName.value.substring(0,3) + lastName.value.substring(0,3) + '123';
        password.value = passwordValue;
    }
});