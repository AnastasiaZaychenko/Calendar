///////////////// LOGIN AND SIGNUP /////////////////////
function saveSignup(event) {
  event.preventDefault();

  const email = emailInput.value;
  const password = passwordInput.value;
  const repeatPassword = repeatPasswordInput.value;

  if (password !== repeatPassword) {
    alert("password not matches");

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

////////////////////////////

function handleAddEventC(evt) {
  try {
    evt.preventDefault();
    const eventName = evt.target.elements.eventName.value;
    const color = evt.target.elements.color.value;
    const category = evt.target.elements.category.value;
    const importance = evt.target.elements.importance.value;
    const date = evt.target.elements.date.value;
    const description = evt.target.elements.description.value;

    eventC.push(
      new EventC(eventName, category, color, importance, date, description)
    );
    saveToLocalStorage("data", eventC);

    rendereventC(eventC);
  } catch (error) {
    console.log(error);
  }
}

function rendereventC(eventC: EventC[]): void {
  try {
    if (!eventC || !Array.isArray(eventC))
      throw new Error("EventC is not an array");
    const eventCRender = document.querySelector(`.event__panel__events`);
    if (!eventCRender) throw new Error("eventCRender not found");

    const html: string = eventC
      .map((eventC) => {
        return `
        <div class="event__panel__event" style="background-color:${eventC.color}">
          <h3> ${eventC.eventName}</h3> <div> category : ${eventC.category} </div>
          <div> date : ${eventC.date} </div>
          <div> importance : ${eventC.importance} </div>
          <div> description : ${eventC.description} </div>
          <button onclick="HandleDeleteEventC('${eventC.uid}')">Remove</button>
        </div>
        `;
      })
      .join(" ");

    eventCRender.innerHTML = html;
  } catch (error) {
    console.log(error);
  }
}

function HandleDeleteEventC(uid: string) {
  try {
    console.log("uid : ", uid);

    const index = eventC.findIndex((eventC) => eventC.uid === uid);
    if (index === -1) throw new Error("EventC not found");
    console.log(`index : `, index);
    eventC.splice(index, 1);

    saveToLocalStorage("data", eventC);
    rendereventC(eventC);
  } catch (error) {}
}

function saveToLocalStorage(key, eventC) {
  try {
    if (!eventC) {
      throw new Error("EventC is not valid");
    }
    localStorage.setItem(key, JSON.stringify(eventC));
  } catch (error) {
    console.log(error);
  }
}

function geteventCFromLocalStorage(key: string): EventC[] {
  const data = localStorage.getItem(key);
  if (!data) throw new Error("No data found in localStorage for the key");
  const _eventC = JSON.parse(data);
  return _eventC;
}

function renderToScreen() {
  const eventData = geteventCFromLocalStorage("data");
  eventC = eventData ? eventData : [];

  rendereventC(eventC);
}

function handleLogin(event) {
  event.preventDefault();

  const username = getloggedInEmailFromLocalStorage(loggedInEmail);
  const password = getloggedInPasswordFromLocalStorage(loggedInPassword);
  const isValidCredentials = validateCredentials(username, password);

  if (isValidCredentials) {
    localStorage.setItem("loggedInUser", username);
    renderLoggedInUserEvents();
  } else {
    console.log("Invalid credentials");
  }
}

function renderLoggedInUserEvents() {
  const loggedInUser = localStorage.getItem("loggedInUser");

  const loggedInUserEvents = eventC.filter(
    (event) => event.username === loggedInUser
  );
  rendereventC(loggedInUserEvents);
}

function showExistingEvents() {
  const loggedInUser = localStorage.getItem("loggedInUser");

  const loggedInUserEvents = eventC.filter(
    (event) => event.username === loggedInUser
  );

  const displayedEvents = document.querySelectorAll(".event__panel__event");
  const displayedEventIds = Array.from(displayedEvents).map((event) =>
    event.getAttribute("data-event-id")
  );

  const newEvents = loggedInUserEvents.filter(
    (event) => !displayedEventIds.includes(event.uid)
  );

  rendereventC(newEvents);
}

window.addEventListener("beforeunload", () => {
  saveToLocalStorage("data", eventC);
});

window.addEventListener("load", () => {
  renderToScreen();
});
function getloggedInEmailFromLocalStorage(key: string) {
  const loggedInEmail = localStorage.getItem(loggedInEmail);
  if (!loggedInEmail)
    throw new Error("No data found in localStorage for the key");
  const _loggedInEmail = JSON.parse(loggedInEmail);
  return _loggedInEmail;
}
function getloggedInPasswordFromLocalStorage(key: string) {
  const loggedInPassword = localStorage.getItem(loggedInPassword);
  if (!loggedInPassword)
    throw new Error("No data found in localStorage for the key");
  const _loggedInPassword = JSON.parse(loggedInPassword);
  return _loggedInPassword;
}

function handleLogin(event) {
  event.preventDefault();

  const username = getloggedInEmailFromLocalStorage(loggedInEmail);
  const password = getloggedInPasswordFromLocalStorage(loggedInPassword);
  const isValidCredentials = validateCredentials(username, password);

  if (isValidCredentials) {
    localStorage.setItem("loggedInUser", username);
    renderLoggedInUserEvents();
  } else {
    console.log("Invalid credentials");
  }
}

function renderLoggedInUserEvents() {
  const loggedInUser = localStorage.getItem("loggedInUser");

  const loggedInUserEvents = eventC.filter(
    (event) => event.username === loggedInUser
  );
  rendereventC(loggedInUserEvents);
}
function showExistingEvents() {
  const loggedInUser = localStorage.getItem("loggedInUser");

  const loggedInUserEvents = eventC.filter(
    (event) => event.username === loggedInUser
  );

  rendereventC(loggedInUserEvents);
}
