(function(){

    //List of family members
    let members = [];
    
    //Store commonly accessed DOM elements
    let addButton = document.getElementsByClassName("add")[0];
    let submitButton = document.getElementsByTagName("button")[1]; 
    let ageInput = document.getElementsByName("age")[0];
    let relSelect = document.getElementsByName("rel")[0];
    let smokerBox = document.getElementsByName("smoker")[0];
    let debug = document.getElementsByClassName("debug")[0];
    let display = document.getElementsByClassName("household")[0];
    
    //Display or hide elements
    let show = (elem) => {
        elem.style.display = "initial";
    }
    let hide = (elem) => {
        elem.style.display = "none";
    }
    // Handle error message
    let addErrorMessageTo =(message, addTo) => {
        let error = document.createElement("span");
        error.appendChild(document.createTextNode(message));
        error.style = "color:red; margin-left: 20px";
        hide(error);
        addTo.parentElement.appendChild(error);
        return error;
    }
    let ageError = addErrorMessageTo("Age is required and must be a positive number", ageInput);
    let relError = addErrorMessageTo("Relationship is required", relSelect);
    
    //-> Div to show successful submission
    let successMessage = document.createElement("div");
    successMessage.appendChild(document.createTextNode("Your Household has been submitted. You may continue editing and submitting this household."));
    successMessage.style = "color: green";
    hide(successMessage);
    display.parentElement.insertBefore(successMessage, display);
    
    //functions responding to user actions
    let getInputData = ()=> {
        return {
            age: parseInt(ageInput.value),
            rel: relSelect.value,
            smoker: smokerBox.checked
        };
    }
    
    let clearForm = () => {
        ageInput.value = null;
        relSelect.value = "";
        smokerBox.checked = false;
    }
    
    let clearErrors = () => {
        hide(ageError);
        hide(relError);
    }
    
    let validateData = (data) => {
        let valid = true;
        if(!data.age || data.age <= 0) {
            valid = false;
            show(ageError);
        }
        if(!data.rel || data.rel == "") {
            valid = false;
            show(relError);
        }
        return valid;
    }
    
    let updateMembersDisplay = () => {
        let listDisplay = "<ul>";
        for(let i = 0; i < members.length; i++) {
            let member = members[i];
            listDisplay += "<li> Age: " + member.age + ", Relationship: " + member.rel + ", smoker: " + (member.smoker ? "yes" : "no");
            listDisplay += "<br> <button onclick='householdBuilder.removeMember(" + i + ")'> Remove </button> </li> <br>";
        }
        listDisplay += "</ul>";
        display.innerHTML = listDisplay;
    }
    
    window.householdBuilder = {};
    window.householdBuilder.removeMember = function(index) {
        members.splice(index, 1);
        updateMembersDisplay();
    };
    
    //Click listeners for add and submit buttons
    
    addButton.onclick = (event) => {
        clearErrors();
        //get household member data and try to validate it.
        let member = getInputData();
        if(validateData(member)) {
            //if successful, add the memeber to our display and clear the form
            members.push(member);
            updateMembersDisplay();
            clearForm();
        }
        //don't let the form do submit, etc.
        event.preventDefault();
    };
    
    //When submitting, show JSON data that would be submitted to API in debug element
    submitButton.onclick = (event) => {
        debug.innerHTML = JSON.stringify(members);
        show(debug);
        show(successMessage);
        //don't let the form do submit, etc.
        event.preventDefault();
    };
    
    })();