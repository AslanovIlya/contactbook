function header(active, callback) {
  const div = create("div", "nav");
  div.innerHTML = `
    <h2>Phone Book</h2>
    <ul>
    <li><a href="/add" ${
      active ? 'class="active"' : ""
    }>Add new contact</a></li>
    </ul>
    `;
  div.onclick = (e) => {
    e.preventDefault();
    if (e.target.localName === "a" && !active) {
      callback(e.target.getAttribute("href"));
    }
  };
  return div;
}

function contactList(arr, currentIndex, callback) {
  if (arr.length === 0) {
    const res = create("div");
    res.innerHTML = "Empty list! Add one more contact";
    return res;
  }
  const ul = create("ul", "list");
  ul.innerHTML = arr
    .map((el, i) => contactRow(el, i === currentIndex, i))
    .join("");
  ul.onclick = (e) => {
    e.preventDefault();
    if (e.target.localName === "ul") return;
    let li = e.target;
    if (li.localName === "h2" || li.localName === "h3") {
      li = li.parentElement;
    }
    callback(parseInt(li.dataset.index));
  };
  return ul;
}

function contactRow(contact, active, index) {
  return `
        <li class="list-item ${
          active ? "item-active" : ""
        }" data-index="${index}">
            <h2 class="title">${contact.name}</h2>
            <h3 class="sub-title">${contact.phone}</h3>
        </li>
    `;
}

function contactView(contact, callback) {
  if (!contact) {
    const alert = create("div", "alert alert-danger");
    alert.innerHTML = "Something went wrong. Try againg";
    return alert;
  }
  const div = create("div", "contact-view");
  div.innerHTML = `
        <div class="header">
        <h2>${contact.name}</h2>
        <div class="img-btn"><img src="./img/edit.png" alt=""></div>
        </div>
        <div class="contact-view-row"><img src="./img/technology.png" alt=""><h3>${contact.phone}</h3></div>
        <div class="contact-view-row"><img src="./img/multimedia.png" alt=""><h3>${contact.email}</h3></div>
        <div class="contact-view-row"><img src="./img/buildings.png" alt=""><h3>${contact.address}</h3></div>
        <p>${contact.description}</p>
    `;
  div.onclick = (e) => {
    e.preventDefault();
    if (
      (e.target.localName === "div" &&
        e.target.classList.contains("img-btn")) ||
      (e.target.localName === "img" &&
        e.target.getAttribute("src") === "./img/edit.png")
    ) {
      callback();
    }
  };
  return div;
}

function addContact(formControls, status, callback) {
  const div = create("div", "contact-view add-contact");
  div.innerHTML = `
        ${
          status === "success"
            ? '<div class="alert alert-success">Contact was added!</div>'
            : ""
        }
        ${
          status === "error"
            ? '<div class="alert alert-danger">All fields should be fill!</div>'
            : ""
        }
    `;
  div.append(contactForm(formControls, callback));
  return div;
}

function editContact(formControls, callback) {
  const div = create("div", "contact-view add-contact");
  div.append(contactForm(formControls, callback));
  return div;
}

function contactForm(formControls, callback) {
  const form = create("form");
  form.action = "#";
  form.innerHTML = `
        ${formControls.map((c) => createFormControl(c)).join("")}
        <div class="buttons"><button class="add-btn">Add</button></div>
    `;
  form.onsubmit = (e) => {
    e.preventDefault();
    callback({
      name: e.target.name.value,
      phone: e.target.phone.value,
      email: e.target.email.value,
      address: e.target.address.value,
      description: e.target.description.value,
    });
  };
  return form;
}

function createFormControl(control) {
  if (control.el === "input") {
    return `<input class="form-control ${
      control.error ? "is-invalid" : ""
    }" type="${control.type}" name="${control.name}" placeholder="${
      control.placeholder
    }" value="${control.value}"></input>`;
  } else if (control.el === "textarea") {
    return `<textarea class="form-control ${
      control.error ? "is-invalid" : ""
    }" type="${control.type}" name="${control.name}" placeholder="${
      control.placeholder
    }">${control.value}</textarea>`;
  }
}

function create(el, className) {
  const res = document.createElement(el);
  if (className) {
    res.className = className;
  }
  return res;
}
