/////////////////// LOGIN AND SIGNUP /////////////////////
function saveSignup(event) {
    event.preventDefault();
    var emailInput = document.querySelector('input[name="newEmail"]');
    var passwordInput = document.querySelector('input[name="newPassword"]');
    var repeatPasswordInput = document.querySelector('input[name="password-repeat"]');
    var email = emailInput.value;
    var password = passwordInput.value;
    var repeatPassword = repeatPasswordInput.value;
    if (password !== repeatPassword) {
        return;
    }
    localStorage.setEventC("email", email);
    localStorage.setEventC("password", password);
    window.location.href = "login.html";
}
function saveLogin(event) {
    event.preventDefault();
    var emailInput = document.querySelector('input[name="Email"]');
    var passwordInput = document.querySelector('input[name="password"]');
    var rememberCheckbox = document.querySelector('input[name="remember"]');
    var email = emailInput.value;
    var password = passwordInput.value;
    var remember = rememberCheckbox.checked;
    if (remember) {
        localStorage.setEventC("email", email);
        localStorage.setEventC("password", password);
    }
    else {
        localStorage.removeEventC("email");
        localStorage.removeEventC("password");
    }
    window.location.href = "index.html";
}
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
