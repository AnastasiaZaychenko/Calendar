/////////////////// LOGIN AND SIGNUP /////////////////////
function saveSignup(event) {
  event.preventDefault();

  const email = emailInput.value;
  const password = passwordInput.value;
  const repeatPassword = repeatPasswordInput.value;

  if (password !== repeatPassword) {
    return;
  }

  const existingUser = userArray.find((user) => user.email === email);
  if (existingUser) {
    alert("User already exists. Please log in instead.");
    return;
  }

  const newUser = new user(email, password);
  userArray.push(newUser);

  localStorage.setItem("userArray", JSON.stringify(userArray));

  localStorage.setItem("loggedInEmail", email);
  localStorage.setItem("loggedInPassword", password);

  window.location.href = "login.html";
}

function populateForm() {
  const loggedInEmail = localStorage.getItem("loggedInEmail");
  const loggedInPassword = localStorage.getItem("loggedInPassword");

  if (loggedInEmail && loggedInPassword) {
    EmailInput.value = loggedInEmail;
    PasswordInput.value = loggedInPassword;
    RememberCheckbox.checked = true;
  }
}

function saveLogin(event) {
  event.preventDefault();

  const Email = EmailInput.value;
  const Password = PasswordInput.value;
  const Remember = RememberCheckbox.checked;

  const userArrayData = localStorage.getItem("userArray");
  if (!userArrayData) {
    alert("No user data found. Please sign up first.");
    return;
  }

  const storedUsers = JSON.parse(userArrayData);
  const currentUser = storedUsers.find((user) => user.email === Email);

  if (!currentUser) {
    alert("Invalid email or password");
    return;
  }

  if (currentUser.password === Password) {
    if (Remember) {
      localStorage.setItem("loggedInEmail", Email);
      localStorage.setItem("loggedInPassword", Password);
    } else {
      localStorage.removeItem("loggedInEmail");
      localStorage.removeItem("loggedInPassword");
    }

    window.location.href = "index.html";
  } else {
    alert("Invalid email or password");
  }
}
console.log(saveLogin);

///////////////////////////////////

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
