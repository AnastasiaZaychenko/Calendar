class user {
  public UserName: string | null;
  public Email: string | null;
  public Password: string | null;

  constructor(
    public userName,
    public email: string | null,
    public password: string | null
  ) {
    this.Email = email;
    this.Password = password;
  }
}

class User {
  constructor(
    public userName,
    public email: string | null,
    public password: string | null
  ) {}
}

const userArray: user[] = new Array();

/////////////////////////

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
    public date: Date,
    public description: string
  ) {
    this.uid = uid();
  }
}

const eventC: EventC[] = [];

console.log(eventC);
