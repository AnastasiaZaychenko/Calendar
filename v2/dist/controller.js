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
    localStorage.setItem("email", email);
    localStorage.setItem("password", password);
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
        localStorage.setItem("email", email);
        localStorage.setItem("password", password);
    }
    else {
        localStorage.removeItem("email");
        localStorage.removeItem("password");
    }
    window.location.href = "index.html";
}
///////////////////////////////////
// Create an event object
var event = {
    title: eventName,
    start: eventDate + "T" + eventTime,
    end: eventDate + "T" + eventTime
};
// Add the event to the calendar
if (window.calendar && window.calendar.createEvent) {
    window.calendar
        .createEvent(event)
        .then(function (response) {
        console.log("Event added successfully:", response);
        alert("Event added successfully!");
    })["catch"](function (error) {
        console.error("Error adding event:", error);
        alert("Error adding event. Please try again.");
    });
}
else {
    console.error("Web Calendar API not supported.");
    alert("Web Calendar API not supported.");
}
