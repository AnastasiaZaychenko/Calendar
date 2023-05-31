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

  localStorage.setEventC("email", email);
  localStorage.setEventC("password", password);

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
    localStorage.setEventC("email", email);
    localStorage.setEventC("password", password);
  } else {
    localStorage.removeEventC("email");
    localStorage.removeEventC("password");
  }

  window.location.href = "index.html";
}

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
