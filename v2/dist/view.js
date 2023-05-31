var emailInput = document.querySelector('input[name="newEmail"]');
var passwordInput = document.querySelector('input[name="newPassword"]');
var repeatPasswordInput = document.querySelector('input[name="password-repeat"]');
var rememberCheckbox = document.querySelector('input[name="remember"]');
var EmailInput = document.querySelector('input[name="Email"]');
var PasswordInput = document.querySelector('input[name="password"]');
var RememberCheckbox = document.querySelector('input[name="remember"]');
///////////////////////////
var renderCalendar = function () {
    var firstDayofMonth = new Date(currYear, currMonth, 1).getDay();
    var lastDateofMonth = new Date(currYear, currMonth + 1, 0).getDate();
    var lastDayofMonth = new Date(currYear, currMonth, lastDateofMonth).getDay();
    var lastDateofLastMonth = new Date(currYear, currMonth, 0).getDate();
    var liTag = "";
    for (var i = firstDayofMonth; i > 0; i--) {
        liTag += "<li  class=\"inactive\">" + (lastDateofLastMonth - i + 1) + "</li>";
    }
    for (var i = 1; i <= lastDateofMonth; i++) {
        var isToday = i === date.getDate() &&
            currMonth === new Date().getMonth() &&
            currYear === new Date().getFullYear()
            ? "active"
            : "";
        liTag += "<li  class=\"" + isToday + "\">" + i + "</li>";
    }
    for (var i = lastDayofMonth; i < 6; i++) {
        liTag += "<li  class=\"inactive\">" + (i - lastDayofMonth + 1) + "</li>";
    }
    currentDate.innerText = months[currMonth] + " " + currYear;
    daysTag.innerHTML = liTag;
};
prevNextIcon.forEach(function (icon) {
    icon.addEventListener("click", function () {
        currMonth = icon.id === "prev" ? currMonth - 1 : currMonth + 1;
        if (currMonth < 0 || currMonth > 11) {
            date = new Date(currYear, currMonth, new Date().getDate());
            currYear = date.getFullYear();
            currMonth = date.getMonth();
        }
        else {
            date = new Date();
        }
        renderCalendar();
    });
});
var eventCRender = document.querySelector("#eventCRender");
console.log(eventCRender);
