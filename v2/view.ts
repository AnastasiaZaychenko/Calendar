const emailInput = document.querySelector(
  'input[name="newEmail"]'
) as HTMLInputElement;
const passwordInput = document.querySelector(
  'input[name="newPassword"]'
) as HTMLInputElement;
const repeatPasswordInput = document.querySelector(
  'input[name="password-repeat"]'
) as HTMLInputElement;
const rememberCheckbox = document.querySelector(
  'input[name="remember"]'
) as HTMLInputElement;

const EmailInput = document.querySelector(
  'input[name="Email"]'
) as HTMLInputElement;
const PasswordInput = document.querySelector(
  'input[name="password"]'
) as HTMLInputElement;
const RememberCheckbox = document.querySelector(
  'input[name="remember"]'
) as HTMLInputElement;

///////////////////////////
const renderCalendar = (): void => {
  const firstDayofMonth = new Date(currYear, currMonth, 1).getDay();
  const lastDateofMonth = new Date(currYear, currMonth + 1, 0).getDate();
  const lastDayofMonth = new Date(
    currYear,
    currMonth,
    lastDateofMonth
  ).getDay();
  const lastDateofLastMonth = new Date(currYear, currMonth, 0).getDate();
  let liTag = "";

  for (let i = firstDayofMonth; i > 0; i--) {
    liTag += `<li  class="inactive">${lastDateofLastMonth - i + 1}</li>`;
  }

  for (let i = 1; i <= lastDateofMonth; i++) {
    let isToday =
      i === date.getDate() &&
      currMonth === new Date().getMonth() &&
      currYear === new Date().getFullYear()
        ? "active"
        : "";
    liTag += `<li  class="${isToday}">${i}</li>`;
  }

  for (let i = lastDayofMonth; i < 6; i++) {
    liTag += `<li  class="inactive">${i - lastDayofMonth + 1}</li>`;
  }
  currentDate.innerText = `${months[currMonth]} ${currYear}`;
  daysTag.innerHTML = liTag;
};
prevNextIcon.forEach((icon) => {
  icon.addEventListener("click", () => {
    currMonth = icon.id === "prev" ? currMonth - 1 : currMonth + 1;

    if (currMonth < 0 || currMonth > 11) {
      date = new Date(currYear, currMonth, new Date().getDate());
      currYear = date.getFullYear();
      currMonth = date.getMonth();
    } else {
      date = new Date();
    }
    renderCalendar();
  });
});
const eventCRender = document.querySelector("#eventCRender") as HTMLDivElement;
console.log(eventCRender);
