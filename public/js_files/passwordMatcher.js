var err_prompt = document.querySelectorAll(".err_prompt");
var match_prompt = document.querySelectorAll(".success_prompt"); 

const oldPassword = document.querySelectorAll("#oldPassword");
const oldPasswordConfirmation = document.querySelectorAll("#oldPasswordConfirm");

const newPassword = document.querySelectorAll('#newPassword');
const newPasswordconfirmation = document.querySelectorAll('#newPasswordConfirm');


oldPassword[0].addEventListener('keyup', function(){

    let isPasswordNotMatch = checkMatch(oldPassword[0].value, oldPasswordConfirmation[0].value);

    if(isPasswordNotMatch){

        err_prompt[1].hidden = false;
        match_prompt[0].hidden = true;
    }

    else if(oldPasswordConfirmation[0].value.length > 0 && oldPassword[0].value.length > 0){
        err_prompt[1].hidden = true;
        match_prompt[0].hidden = false;
    }
})

oldPasswordConfirmation[0].addEventListener('keyup', function(){
    let isPasswordNotMatch = checkMatch(oldPassword[0].value, oldPasswordConfirmation[0].value);

    if(isPasswordNotMatch){
        err_prompt[1].hidden = false;
        match_prompt[0].hidden = true;
    }
    else if(oldPasswordConfirmation[0].value.length > 0 && oldPassword[0].value.length > 0){
        err_prompt[1].hidden = true;
        match_prompt[0].hidden = false;
    }

});

newPassword[0].addEventListener('keyup', function(){

    let isPasswordNotMatch = checkMatch(newPassword[0].value, newPasswordconfirmation[0].value);

    if(isPasswordNotMatch){

        err_prompt[2].hidden = false;
        match_prompt[1].hidden = true;
    }

    else if(newPasswordconfirmation[0].value.length > 0 && newPassword[0].value.length > 0){
        err_prompt[2].hidden = true;
        match_prompt[1].hidden = false;
    }
})

newPasswordconfirmation[0].addEventListener('keyup', function(){
    let isPasswordNotMatch = checkMatch(newPassword[0].value, newPasswordconfirmation[0].value);

    if(isPasswordNotMatch){
        err_prompt[2].hidden = false;
        match_prompt[1].hidden = true;
    }
    else if(newPasswordconfirmation[0].value.length > 0 && newPassword[0].value.length > 0){
        err_prompt[2].hidden = true;
        match_prompt[1].hidden = false;
    }

});







function checkMatch(textField1, textField2){

    if(textField2.length > 0 ){
        if(textField1 != textField2)
            return true;
        else
            return false;
    }
    return false;
}

