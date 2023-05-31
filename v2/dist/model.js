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
var EventC = /** @class */ (function () {
    function EventC(eventName, category, color, importance, date) {
        this.eventName = eventName;
        this.category = category;
        this.color = color;
        this.importance = importance;
        this.date = date;
        this.uid = uid();
    }
    return EventC;
}());
var eventC = [];
console.log(eventC);
