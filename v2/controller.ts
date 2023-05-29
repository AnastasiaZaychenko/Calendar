/////////////////// LOGIN AND SIGNUP /////////////////////
function saveSignup(event) {
  event.preventDefault();

  const emailInput = document.querySelector('input[name="newEmail"]') as HTMLInputElement;
  const passwordInput = document.querySelector('input[name="newPassword"]') as HTMLInputElement;
  const repeatPasswordInput = document.querySelector('input[name="password-repeat"]') as HTMLInputElement;

  const email = emailInput.value;
  const password = passwordInput.value;
  const repeatPassword = repeatPasswordInput.value;

  if (password !== repeatPassword) {
    return;
  }

  localStorage.setItem("email", email);
  localStorage.setItem("password", password);

  window.location.href = "login.html";
}

function saveLogin(event) {
  event.preventDefault();

  const emailInput = document.querySelector('input[name="Email"]') as HTMLInputElement;
  const passwordInput = document.querySelector('input[name="password"]') as HTMLInputElement;
  const rememberCheckbox = document.querySelector('input[name="remember"]') as HTMLInputElement;

  const email = emailInput.value;
  const password = passwordInput.value;
  const remember = rememberCheckbox.checked;

  if (remember) {
    localStorage.setItem("email", email);
    localStorage.setItem("password", password);
  } else {
    localStorage.removeItem("email");
    localStorage.removeItem("password");
  }

  window.location.href = "index.html";
}

///////////////////////////////////


function openWindow(element) {
  const title = element.innerText;
  const dateStr = `${months[currMonth]} ${currYear} ${title}`;
  // Open a window or display a popup with the title and date
  console.log(dateStr);
} // Replace with your code to open
const allDays = 
