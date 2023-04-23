const root = document.querySelector("#root");
const state = {
  path: "/",
  contacts: [],
  currentIndex: -1,
  status: null,
  form: [
    {
      el: "input",
      type: "text",
      name: "name",
      value: "",
      placeholder: "Type your name",
      error: null,
    },
    {
      el: "input",
      type: "text",
      name: "phone",
      value: "",
      placeholder: "Type your phone",
      error: null,
    },
    {
      el: "input",
      type: "text",
      name: "email",
      value: "",
      placeholder: "Type your email",
      error: null,
    },
    {
      el: "input",
      type: "text",
      name: "address",
      value: "",
      placeholder: "Type your address",
      error: null,
    },
    {
      el: "textarea",
      type: "text",
      name: "description",
      value: "",
      placeholder: "Type description",
      error: null,
    },
  ],
};

render();

function render() {
  root.innerHTML = "";
  root.append(header(state.path === "/add", headerClickHandler));
  root.append(document.createElement("hr"));
  const div = create("div", "contacts");
  root.append(div);
  div.append(
    contactList(state.contacts, state.currentIndex, contactClickHandler)
  );
  switch (state.path) {
    case "/add":
      div.append(
        addContact(state.form, state.status, addContactSuccessHandler)
      );
      break;
    case "/view":
      div.append(
        contactView(
          state.currentIndex >= 0 ? state.contacts[state.currentIndex] : null,
          contactEditClickHandler
        )
      );
      break;
    case "/edit":
      div.append(editContact(state.form, editContactSaveHandler));
      break;
  }
}

function headerClickHandler(path) {
  state.currentIndex = -1;
  navigate(path);
}

function contactClickHandler(index) {
  if (state.currentIndex === index && state.path === "/view") {
    return;
  }
  state.currentIndex = index;
  navigate("/view");
}

function contactEditClickHandler() {
    let i = 0;
    for(let key in state.contacts[state.currentIndex]){
        state.form[i++].value = state.contacts[state.currentIndex][key];
    }
    navigate("/edit");
}

function addContactSuccessHandler(contact) {
  let isError = false;
  let i = 0;
  for (let key in contact) {
    state.form[i].value = contact[key];
    if (!contact[key]) {
      state.status = "error";
      state.form[i].error = true;
      isError = true;
    } else {
      state.form[i].error = null;
      isError = false;
    }
    i++;
  }
  if (isError) {
    render();
    return;
  }
  state.status = "success";
  for (let control of state.form) {
    control.value = "";
    control.error = null;
  }
  state.contacts.push(contact);
  render();
}

function editContactSaveHandler(contact) {
  state.contacts[state.currentIndex] = contact;
  for(let control of state.form){
    control.value = '';
    control.error = null;
  }
  navigate("/view");
}

function navigate(path) {
  state.status = null;
  state.path = path;
  render();
}
