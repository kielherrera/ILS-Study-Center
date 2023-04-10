const studentCount = document.querySelectorAll('tr').length - 1;
const enrollmentCap = parseInt(document.getElementById('enrollmentCap').innerHTML);
const addButton = document.getElementById('AddButton');

if(studentCount == enrollmentCap){
    addButton.style.display = "none";
}

else{
    addButton.style.display = "inline";

}