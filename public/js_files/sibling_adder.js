const maxSib = 5, minSib = 1;
var counter = 1;

const addButton = document.getElementById("add_sibling");
const removeButtion = document.getElementById("remove_sibling");
const sectionToAdd = document.querySelectorAll(".sibling_adder")[0];


addButton.addEventListener("click", function(){
    addNewSection();
});
console.log(addButton);

function addNewSection(){
    const toBeInserted = document.querySelectorAll(".sibling_section")[0];
    console.log(toBeInserted);
     

}