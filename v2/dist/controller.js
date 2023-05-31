///////////////// LOGIN AND SIGNUP /////////////////////
function saveSignup(event) {
    event.preventDefault();
    var userName = userNameInput.value;
    var email = emailInput.value;
    var password = passwordInput.value;
    var repeatPassword = repeatPasswordInput.value;
    if (password !== repeatPassword) {
        alert("password not matches");
        return;
    }
    var existingUser = userArray.find(function (user) { return user.email === email; });
    if (existingUser) {
        alert("User already exists. Please log in instead.");
        return;
    }
    var newUser = new user(email, password);
    userArray.push(newUser);
    localStorage.setItem("userArray", JSON.stringify(userArray));
    localStorage.setItem("loggedInUserName", userName);
    localStorage.setItem("loggedInEmail", email);
    localStorage.setItem("loggedInPassword", password);
    window.location.href = "login.html";
}
function populateForm() {
    var loggedInEmail = localStorage.getItem("loggedInEmail");
    var loggedInPassword = localStorage.getItem("loggedInPassword");
    if (loggedInEmail && loggedInPassword) {
        UserNameInput.value = loggedInUserName;
        EmailInput.value = loggedInEmail;
        PasswordInput.value = loggedInPassword;
        RememberCheckbox.checked = true;
    }
}
function saveLogin(event) {
    event.preventDefault();
    var Email = EmailInput.value;
    var Password = PasswordInput.value;
    var Remember = RememberCheckbox.checked;
    var userArrayData = localStorage.getItem("userArray");
    if (!userArrayData) {
        alert("No user data found. Please sign up first.");
        return;
    }
    var storedUsers = JSON.parse(userArrayData);
    var currentUser = storedUsers.find(function (user) { return user.email === Email; });
    if (!currentUser) {
        alert("Invalid email or password");
        return;
    }
    if (currentUser.password === Password) {
        if (Remember) {
            localStorage.setItem("loggedInEmail", Email);
            localStorage.setItem("loggedInPassword", Password);
        }
        else {
            localStorage.removeItem("loggedInEmail");
            localStorage.removeItem("loggedInPassword");
        }
        window.location.href = "index.html";
    }
    else {
        alert("Invalid email or password");
    }
}
console.log(saveLogin);
////////////////////////////
function handleAddEventC(evt) {
    try {
        evt.preventDefault();
        var eventName = evt.target.elements.eventName.value;
        var color = evt.target.elements.color.value;
        var category = evt.target.elements.category.value;
        var importance = evt.target.elements.importance.value;
        var date = evt.target.elements.date.value;
        eventC.push(new EventC(eventName, category, color, importance, date));
        saveToLocalStorage("data", eventC);
        // // Create an event object
        // var event = {
        //   title: eventName,
        //   start: eventDate + "T" + eventTime,
        //   end: eventDate + "T" + eventTime,
        // };
        // // Add the event to the calendar
        // if (window.calendar && window.calendar.createEvent) {
        //   window.calendar
        //     .createEvent(event)
        //     .then(function (response) {
        //       console.log("Event added successfully:", response);
        //       alert("Event added successfully!");
        //     })
        //     .catch(function (error) {
        //       console.error("Error adding event:", error);
        //       alert("Error adding event. Please try again.");
        //     });
        // } else {
        //   console.error("Web Calendar API not supported.");
        //   alert("Web Calendar API not supported.");
        // }
        rendereventC(eventC);
    }
    catch (error) {
        console.log(error);
    }
}
function rendereventC(eventC) {
    try {
        if (!eventC || !Array.isArray(eventC))
            throw new Error("EventC is not an array");
        var html = eventC
            .map(function (eventC) {
            return "\n        <div class=\"eventC\" style=\"background-color:" + eventC.color + "\">\n          <h3> " + eventC.eventName + "</h3> <div> category : " + eventC.category + " </div>\n          <div>  </div>\n          <div> quantity : " + eventC.importance + " </div>\n          <div> date : " + eventC.date + " </div>\n          <button onclick=\"HandleDeleteEventC('" + eventC.uid + "')\">Remove</button>\n        </div>\n        ";
        })
            .join(" ");
        //  renderToScreen()
        // return html;
        eventCRender.innerHTML = html;
    }
    catch (error) {
        console.log(error);
        return "";
    }
}
// [[uid],[],[].[] ...]
//------------------HandleDeleteEventC('${EventC.uid}')
function HandleDeleteEventC(uid) {
    try {
        console.log("uid : ", uid);
        var index = eventC.findIndex(function (eventC) { return eventC.uid === uid; });
        if (index === -1)
            throw new Error("EventC not found");
        console.log("index : ", index);
        eventC.splice(index, 1);
        // renderToScreen();
        rendereventC(eventC);
    }
    catch (error) { }
}
function renderToScreen() {
    if (!eventCRender)
        throw new Error("eventCRender not found");
    eventCRender.innerHTML = rendereventC(eventC);
}
//----------------
function handleViewPassword() {
    try {
        var passwordElement = document.querySelector("#pass");
        console.dir(passwordElement);
        if (passwordElement.type === "password") {
            passwordElement.type = "text";
        }
        else {
            passwordElement.type = "password";
        }
    }
    catch (error) {
        console.error(error);
    }
}
//-----------save to localstoarge
function saveToLocalStorage(key, eventC) {
    try {
        if (!eventC) {
            throw new Error("event i not valid");
        }
        localStorage.setEventC(key, JSON.stringify(eventC));
    }
    catch (error) {
        console.log(error);
    }
}
function geteventCFromLocalStorage(key) {
    var data = localStorage.getEventC(key);
    if (!data)
        throw new Error("bad data");
    var _eventC = JSON.parse(data);
    return _eventC;
}
