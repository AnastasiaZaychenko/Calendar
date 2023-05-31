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
    eventC.push(new EventC(eventName, category, color, importance, date));
    saveToLocalStorage("data", eventC);

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
    rendereventC(eventC);
  } catch (error) {
    console.log(error);
  }
}

function rendereventC(eventC: EventC[]): string {
  try {
    if (!eventC || !Array.isArray(eventC))
      throw new Error("EventC is not an array");

    const html: string = eventC
      .map((eventC) => {
        return `
        <div class="eventC" style="background-color:${eventC.color}">
          <h3> ${eventC.eventName}</h3> <div> category : ${eventC.category} </div>
          <div>  </div>
          <div> quantity : ${eventC.importance} </div>
          <div> date : ${eventC.date} </div>
          <button onclick="HandleDeleteEventC('${eventC.uid}')">Remove</button>
        </div>
        `;
      })
      .join(" ");
    //  renderToScreen()
    // return html;
    eventCRender.innerHTML = html;
  } catch (error) {
    console.log(error);
    return "";
  }
}

// [[uid],[],[].[] ...]
//------------------HandleDeleteEventC('${EventC.uid}')
function HandleDeleteEventC(uid: string) {
  try {
    console.log("uid : ", uid);

    const index = eventC.findIndex((eventC) => eventC.uid === uid);
    if (index === -1) throw new Error("EventC not found");
    console.log(`index : `, index);
    eventC.splice(index, 1);

    // renderToScreen();
    rendereventC(eventC);
  } catch (error) {}
}

function renderToScreen() {
  if (!eventCRender) throw new Error("eventCRender not found");
  eventCRender.innerHTML = rendereventC(eventC);
}
//----------------
function handleViewPassword() {
  try {
    const passwordElement: any = document.querySelector("#pass");
    console.dir(passwordElement);
    if (passwordElement.type === "password") {
      passwordElement.type = "text";
    } else {
      passwordElement.type = "password";
    }
  } catch (error) {
    console.error(error);
  }
}
//-----------save to localstoarge

function saveToLocalStorage(key, eventC: EventC[]) {
  try {
    if (!eventC) {
      throw new Error("event i not valid");
    }
    localStorage.setEventC(key, JSON.stringify(eventC));
  } catch (error) {
    console.log(error);
  }
}

function geteventCFromLocalStorage(key: string): EventC[] | undefined {
  const data = localStorage.getEventC(key);
  if (!data) throw new Error("bad data");
  const _eventC = JSON.parse(data);
  return _eventC;
}
