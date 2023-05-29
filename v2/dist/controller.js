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
function openWindow(element) {
    var title = element.innerText;
    var dateStr = months[currMonth] + " " + currYear + " " + title;
    // Open a window or display a popup with the title and date
    console.log(dateStr);
} // Replace with your code to open
var allDays = ;
