/////////////////// LOGIN AND SIGNUP /////////////////////
function saveSignup(event) {
  event.preventDefault();

  const emailInput = document.querySelector(
    'input[name="newEmail"]'
  ) as HTMLInputElement;
  const passwordInput = document.querySelector(
    'input[name="newPassword"]'
  ) as HTMLInputElement;
  const repeatPasswordInput = document.querySelector(
    'input[name="password-repeat"]'
  ) as HTMLInputElement;

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

  const emailInput = document.querySelector(
    'input[name="Email"]'
  ) as HTMLInputElement;
  const passwordInput = document.querySelector(
    'input[name="password"]'
  ) as HTMLInputElement;
  const rememberCheckbox = document.querySelector(
    'input[name="remember"]'
  ) as HTMLInputElement;

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

// Create an event object
var event = {
  title: eventName,
  start: eventDate + "T" + eventTime,
  end: eventDate + "T" + eventTime,
};

// Add the event to the calendar
if (window.calendar && window.calendar.createEvent) {
  window.calendar
    .createEvent(event)
    .then(function (response) {
      console.log("Event added successfully:", response);
      alert("Event added successfully!");
    })
    .catch(function (error) {
      console.error("Error adding event:", error);
      alert("Error adding event. Please try again.");
    });
} else {
  console.error("Web Calendar API not supported.");
  alert("Web Calendar API not supported.");
}
