/////////////////// LOGIN AND SIGNUP /////////////////////
function saveSignup(event) {
    event.preventDefault();
    var email = emailInput.value;
    var password = passwordInput.value;
    var repeatPassword = repeatPasswordInput.value;
    if (password !== repeatPassword) {
        return;
    }
    var existingUser = userArray.find(function (user) { return user.Email === email; });
    if (existingUser) {
        alert("User already exists. Please log in instead.");
        return;
    }
    var newUser = new user(email, password);
    userArray.push(newUser);
    localStorage.setItem("userArray", JSON.stringify(userArray));
    window.location.href = "login.html";
}
function saveLogin(event) {
    event.preventDefault();
    var Email = emailInput.value;
    var Password = passwordInput.value;
    var Remember = rememberCheckbox.checked;
    var currentUser = userArray.find(function (u) { return u.Email == Email; });
    if (currentUser == null) {
        alert("Error! make sure to fill Email and password");
    }
    if (!currentUser) {
        alert("Error! wrong Email or password");
    }
    else {
        window.location.href = "index.html";
    }
    var savedUserData = localStorage.getItem("userData");
    if (savedUserData) {
        var userData = JSON.parse(savedUserData);
        var savedEmail = userData.email;
        var savedPassword = userData.password;
        if (Email === savedEmail && Password === savedPassword) {
            if (Remember) {
                localStorage.setItem("email", Email);
                localStorage.setItem("password", Password);
            }
            else {
                localStorage.removeItem("email");
                localStorage.removeItem("password");
            }
            window.location.href = "index.html";
        }
        else {
            alert("Invalid email or password");
        }
    }
    else {
        alert("No user data found. Please sign up first.");
    }
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
///////////////////////////////////
var myList = document.getElementsByTagName("LI");
var i;
for (i = 0; i < myList.length; i++) {
    var span = document.createElement("SPAN");
    var txt = document.createTextNode("\u00D7");
    span.className = "close";
    span.appendChild(txt);
    myList[i].appendChild(span);
}
var close = document.getElementsByClassName("close");
var i;
for (i = 0; i < close.length; i++) {
    close[i].onclick = function () {
        var div = this.parentElement;
        div.style.display = "none";
    };
}
var list = document.querySelector("ul");
list.addEventListener("click", function (ev) {
    if (ev.target.tagName === "LI") {
        ev.target.classList.toggle("checked");
    }
}, false);
function newElement() {
    var li = document.createElement("li");
    var inputValue = document.getElementById("myInput").value;
    var t = document.createTextNode(inputValue);
    li.appendChild(t);
    if (inputValue === "") {
        alert("You must write something!");
    }
    else {
        document.getElementById("myUL").appendChild(li);
    }
    document.getElementById("myInput").value = "";
    var span = document.createElement("SPAN");
    var txt = document.createTextNode("\u00D7");
    span.className = "close";
    span.appendChild(txt);
    li.appendChild(span);
    for (i = 0; i < close.length; i++) {
        close[i].onclick = function () {
            var div = this.parentElement;
            div.style.display = "none";
        };
    }
}
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
