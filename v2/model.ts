const daysTag = document.querySelector(".days") as HTMLElement;
const currentDate = document.querySelector(".current-date") as HTMLElement;
const prevNextIcon = document.querySelectorAll(".icons span");

let date = new Date();
let currYear = date.getFullYear();
let currMonth = date.getMonth();

const months: string[] = [
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
class EventC {
  uid: string;
  constructor(
    public eventName: string,
    public category: string,
    public color: string,
    public importance: number,
    public date: Date
  ) {
    this.uid = uid();
  }
}

const eventC: EventC[] = [];

console.log(eventC);
