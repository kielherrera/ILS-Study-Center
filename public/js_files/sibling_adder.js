const maxSib = 5, minSib = 0;
var counter = 1;

const addButton = document.getElementById("add_sibling");
const removeButton = document.getElementById("remove_sibling");
var container = document.querySelectorAll(".sibling_adder")[0];

console.log(removeButton);

addButton.addEventListener("click", function(){

        if(counter <= maxSib){
            addNewSection(counter);
            counter = counter +1
        }
});


removeButton.addEventListener("click", function(){
    if(counter >= minSib){
        removeOne();
        counter = counter - 1;
    }
})

function addNewSection(){
    var inputContainer;
    var labelContainer;
    var inputItem;
    var labelItem;
    var subItemContainer;
    var options // For select elements;
    let row_container = document.createElement("div");

    let seperator = document.createElement("div");
    seperator.setAttribute("class", "row_container sibling_item");

    // Create Name
    let row_item = document.createElement("div");
    row_item.setAttribute("class", "row_item col_container")
    
    labelContainer = document.createElement("div");
    labelContainer.setAttribute("class", "label_container");

    labelItem = document.createElement("label");
    labelItem.innerHTML = "Name";

    labelContainer.append(labelItem);

    inputContainer = document.createElement("div");
    inputContainer.setAttribute("class", "output_container");

    inputItem = document.createElement("input");
    inputItem.type = "text";
    inputItem.name = "siblingName[]";
    inputItem.required = true;

    inputContainer.append(inputItem);

    row_item.append(labelContainer);
    row_item.append(inputContainer);

    seperator.append(row_item);


    // Create Age
    row_item = document.createElement("div");
    row_item.setAttribute("class", "row_item col_container")
    
    labelContainer = document.createElement("div");
    labelContainer.setAttribute("class", "label_container");

    labelItem = document.createElement("label");
    labelItem.innerHTML = "Age";

    labelContainer.append(labelItem);

    inputContainer = document.createElement("div");
    inputContainer.setAttribute("class", "output_container");

    inputItem = document.createElement("input");
    inputItem.type = "number";
    inputItem.name = "siblingAge[]";
    inputItem.required = true;

    inputContainer.append(inputItem);

    row_item.append(labelContainer);
    row_item.append(inputContainer);

    seperator.append(row_item);
    

    // Handles Gender
    row_item = document.createElement("div");
    row_item.setAttribute("class", "row_item col_container")
    
    labelContainer = document.createElement("div");
    labelContainer.setAttribute("class", "label_container");

    labelItem = document.createElement("label");
    labelItem.innerHTML = "Gender";

    labelContainer.append(labelItem);

    inputContainer = document.createElement("div");
    inputContainer.setAttribute("class", "output_container");

    inputItem = document.createElement("select");
    options = document.createElement("option");
    options.value = "Male";
    options.innerHTML = "Male";
    inputItem.append(options);
    options = document.createElement("option");
    options.value = "Female";
    options.innerHTML = "Female"
    inputItem.append(options);
    inputItem.name = "siblingGender[]";
    inputItem.required = true;

    inputContainer.append(inputItem);

    row_item.append(labelContainer);
    row_item.append(inputContainer);

    seperator.append(row_item);

    // Handles Contact Information
    row_item = document.createElement("div");
    row_item.setAttribute("class", "row_item col_container")
    
    labelContainer = document.createElement("div");
    labelContainer.setAttribute("class", "label_container");

    labelItem = document.createElement("label");
    labelItem.innerHTML = "Contact Information";

    labelContainer.append(labelItem);

    inputContainer = document.createElement("div");
    inputContainer.setAttribute("class", "output_container");

    inputItem = document.createElement("input");
    inputItem.type = "number";
    inputItem.name = "siblingContactInformation[]";
    inputItem.required = true;

    inputContainer.append(inputItem);

    row_item.append(labelContainer);
    row_item.append(inputContainer);

    seperator.append(row_item);

    // Add to the main container
    container.append(seperator);
}

function removeOne(){
    var siblings = document.querySelectorAll(".sibling_item");
    siblings[siblings.length-1].remove();
}

