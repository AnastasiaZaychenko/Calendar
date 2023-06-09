///////////////// LOGIN AND SIGNUP /////////////////////
function saveSignup(event) {
    event.preventDefault();
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
    localStorage.setItem("loggedInEmail", email);
    localStorage.setItem("loggedInPassword", password);
    window.location.href = "login.html";
}
function populateForm() {
    var loggedInEmail = localStorage.getItem("loggedInEmail");
    var loggedInPassword = localStorage.getItem("loggedInPassword");
    if (loggedInEmail && loggedInPassword) {
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
        var description = evt.target.elements.description.value;
        eventC.push(new EventC(eventName, category, color, importance, date, description));
        saveToLocalStorage("data", eventC);
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
        var eventCRender = document.querySelector(".event__panel__events");
        if (!eventCRender)
            throw new Error("eventCRender not found");
        var html = eventC
            .map(function (eventC) {
            return "\n        <div class=\"event__panel__event\" style=\"background-color:" + eventC.color + "\">\n          <h3> " + eventC.eventName + "</h3> <div> category : " + eventC.category + " </div>\n          <div> date : " + eventC.date + " </div>\n          <div> importance : " + eventC.importance + " </div>\n          <div> description : " + eventC.description + " </div>\n          <button onclick=\"HandleDeleteEventC('" + eventC.uid + "')\">Remove</button>\n        </div>\n        ";
        })
            .join(" ");
        eventCRender.innerHTML = html;
    }
    catch (error) {
        console.log(error);
    }
}
function HandleDeleteEventC(uid) {
    try {
        console.log("uid : ", uid);
        var index = eventC.findIndex(function (eventC) { return eventC.uid === uid; });
        if (index === -1)
            throw new Error("EventC not found");
        console.log("index : ", index);
        eventC.splice(index, 1);
        saveToLocalStorage("data", eventC);
        rendereventC(eventC);
    }
    catch (error) { }
}
function saveToLocalStorage(key, eventC) {
    try {
        if (!eventC) {
            throw new Error("EventC is not valid");
        }
        localStorage.setItem(key, JSON.stringify(eventC));
    }
    catch (error) {
        console.log(error);
    }
}
function geteventCFromLocalStorage(key) {
    var data = localStorage.getItem(key);
    if (!data)
        throw new Error("No data found in localStorage for the key");
    var _eventC = JSON.parse(data);
    return _eventC;
}
function renderToScreen() {
    var eventData = geteventCFromLocalStorage("data");
    eventC = eventData ? eventData : [];
    rendereventC(eventC);
}
function handleLogin(event) {
    event.preventDefault();
    var username = getloggedInEmailFromLocalStorage(loggedInEmail);
    var password = getloggedInPasswordFromLocalStorage(loggedInPassword);
    var isValidCredentials = validateCredentials(username, password);
    if (isValidCredentials) {
        localStorage.setItem("loggedInUser", username);
        renderLoggedInUserEvents();
    }
    else {
        console.log("Invalid credentials");
    }
}
function renderLoggedInUserEvents() {
    var loggedInUser = localStorage.getItem("loggedInUser");
    var loggedInUserEvents = eventC.filter(function (event) { return event.username === loggedInUser; });
    rendereventC(loggedInUserEvents);
}
function showExistingEvents() {
    var loggedInUser = localStorage.getItem("loggedInUser");
    var loggedInUserEvents = eventC.filter(function (event) { return event.username === loggedInUser; });
    var displayedEvents = document.querySelectorAll(".event__panel__event");
    var displayedEventIds = Array.from(displayedEvents).map(function (event) {
        return event.getAttribute("data-event-id");
    });
    var newEvents = loggedInUserEvents.filter(function (event) { return !displayedEventIds.includes(event.uid); });
    rendereventC(newEvents);
}
window.addEventListener("beforeunload", function () {
    saveToLocalStorage("data", eventC);
});
window.addEventListener("load", function () {
    renderToScreen();
});
function getloggedInEmailFromLocalStorage(key) {
    var loggedInEmail = localStorage.getItem(loggedInEmail);
    if (!loggedInEmail)
        throw new Error("No data found in localStorage for the key");
    var _loggedInEmail = JSON.parse(loggedInEmail);
    return _loggedInEmail;
}
function getloggedInPasswordFromLocalStorage(key) {
    var loggedInPassword = localStorage.getItem(loggedInPassword);
    if (!loggedInPassword)
        throw new Error("No data found in localStorage for the key");
    var _loggedInPassword = JSON.parse(loggedInPassword);
    return _loggedInPassword;
}
function handleLogin(event) {
    event.preventDefault();
    var username = getloggedInEmailFromLocalStorage(loggedInEmail);
    var password = getloggedInPasswordFromLocalStorage(loggedInPassword);
    var isValidCredentials = validateCredentials(username, password);
    if (isValidCredentials) {
        localStorage.setItem("loggedInUser", username);
        renderLoggedInUserEvents();
    }
    else {
        console.log("Invalid credentials");
    }
}
function renderLoggedInUserEvents() {
    var loggedInUser = localStorage.getItem("loggedInUser");
    var loggedInUserEvents = eventC.filter(function (event) { return event.username === loggedInUser; });
    rendereventC(loggedInUserEvents);
}
function showExistingEvents() {
    var loggedInUser = localStorage.getItem("loggedInUser");
    var loggedInUserEvents = eventC.filter(function (event) { return event.username === loggedInUser; });
    rendereventC(loggedInUserEvents);
}
