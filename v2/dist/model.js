var user = /** @class */ (function () {
    function user(email, password) {
        this.email = email;
        this.password = password;
        this.Email = email;
        this.Password = password;
    }
    return user;
}());
var userArray = new Array();
/////////////////////////
var daysTag = document.querySelector(".days");
var currentDate = document.querySelector(".current-date");
var prevNextIcon = document.querySelectorAll(".icons span");
var date = new Date();
var currYear = date.getFullYear();
var currMonth = date.getMonth();
var months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
];
