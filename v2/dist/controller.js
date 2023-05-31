/////////////////// LOGIN AND SIGNUP /////////////////////
function saveSignup(event) {
    event.preventDefault();
    var email = emailInput.value;
    var password = passwordInput.value;
    var repeatPassword = repeatPasswordInput.value;
    if (password !== repeatPassword) {
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
///////////////////////////////////
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
