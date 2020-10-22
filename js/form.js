import {
  INVALID_CLASS,
  ACTIVE_CLASS,
  template,
  errorMessage,
  regObject,
} from "./constants.js";
import { fault } from "./alert.js";

const formContainer = document.getElementById("form-container");
const container = document.getElementById("alert-container");

class User {
  constructor(login, name, age, email, city, password, rPassword) {
    this.login = login;
    this.name = name;
    this.age = age;
    this.email = email;
    this.city = city;
    this.password = password;
    this["repeat password"] = rPassword;
  }
}

const userHelperFabric = (userSettings) => {
  const userHelper = {};
  console.log(userSettings);
  userSettings.forEach((setting) => {
    console.log(setting);
    userHelper[setting] = {
      value: "",
      valid: false,
      checkValidation: setting.validator,
    };
    // console.log(userHelper);
  });

  return userHelper;
};

const ifEmptyFieldChecker = (field) => {
  return function () {
    this[field].valid = this[field].value !== "";
  };
};

const emailRegexFieldChecker = (field, regex) => {
  return function () {
    this[field].valid = regex.test(this[field].value);
  };
};

const passwordMatchFieldChecker = (field1, field2) => {
  return function () {
    this[field1].valid = this[field1].value === this[field2].value;
  };
};

const formSettings = [
  {
    field: "name",
    validator: ifEmptyFieldChecker("name"),
  },
  {
    field: "email",
    validator: emailRegexFieldChecker("email", regObject.email),
  },
  {
    field: "password",
    validator: ifEmptyFieldChecker("password"),
  },
  {
    field: "passwordRepeat",
    validator: passwordMatchFieldChecker("password", "passwordRepeat"),
  },
];
console.log(formSettings);
const loginFormHelper = userHelperFabric(formSettings);
console.log(loginFormHelper);
loginFormHelper.name.checkValidation.bind(loginFormHelper)();

let inputs;
let buttonSubmit;

export const initForm = (template) => {
  let form = document.createElement("form");
  form.className = "form";
  form.id = "form";
  form.innerHTML = template;
  formContainer.append(form);
  inputs = form.getElementsByTagName("input");
  buttonSubmit = document.getElementById("submit");
  buttonSubmit.disabled = disabledButtonState();
  [...inputs].forEach((elem) => {
    elem.addEventListener("input", inputEventHandler);
  });
  buttonSubmit.addEventListener("click", onClick);
};

const removeForm = () => {
  formContainer.innerHTML = "";
};

const switcher = document.getElementById("switcher");

const sections = switcher.getElementsByTagName("div");

for (let section of sections) {
  section.addEventListener("click", setActive);
}

const firstInit = {
  target: sections[0],
};

setActive(firstInit);

function setActive({ target }) {
  sections[Math.abs([...sections].indexOf(target))].classList.add(ACTIVE_CLASS);
  sections[Math.abs([...sections].indexOf(target) - 1)].classList.remove(
    ACTIVE_CLASS
  );
  removeForm();
  initForm(template[Math.abs([...sections].indexOf(target))]);
}

function inputEventHandler(event) {
  if (event.target.value !== undefined) {
    checkUserData(event.target);
    buttonSubmit.disabled = disabledButtonState();
    // setTargetInvalidOnBlur(event.target);
    if (event.target.value.length > 0) {
      event.target.classList.remove(INVALID_CLASS);
    } else {
      event.target.classList.add(INVALID_CLASS);
    }
  }
}

// function setTargetInvalidOnBlur(target) {
//   [...inputs].forEach((elem) => {
//     elem.classList.remove(INVALID_CLASS);
//   });
//   target.classList.add(INVALID_CLASS);
//   target.onblur = () => {
//     if (target.value.length > 0) {
//       target.classList.remove(INVALID_CLASS);
//     }
//   };
// }

function disabledButtonState() {
  for (let input of inputs) {
    if (!(input.value.length > 0)) {
      return true;
    }
  }
  return false;
}
disabledButtonState();

const getData = (userInfo) => {
  [...inputs].forEach((input) => {
    if (input.type !== "submit") userInfo[input.id] = input.value;
  });
  return userInfo;
};

inputs[0].focus();

const checkUserData = (target) => {
  let regExp;
  switch (target.id) {
    case "login": {
      regExp = new RegExp(regObject.login);
      if (regExp.test(target.value)) {
      } else fault(errorMessage.login);
      break;
    }
    case "name": {
      if (target.value.length > 0) {
      } else fault(errorMessage.name);
      break;
    }
    case "age": {
      regExp = new RegExp(regObject.age);

      if (regExp.test(target.value)) {
      } else fault(errorMessage.age);
      break;
    }
    case "email": {
      regExp = new RegExp(regObject.email);

      if (regExp.test(target.value)) {
      } else fault(errorMessage.email);
      break;
    }
    case "city": {
      if (target.value.length > 0) {
      } else fault(errorMessage.city);
      break;
    }
    case "repeat password":
    case "password": {
      if (target.value.length > 0) {
        if (inputs["repeat password"]) {
          if (inputs["repeat password"].value === inputs.password.value) {
          } else if (
            inputs["repeat password"].value.length > 0 &&
            inputs.password.value.length > 0
          ) {
            fault(errorMessage.rPassword);
          }
        }
      }
      break;
    }
    default:
      break;
  }
};

const sayHi = (user) => {
  container.innerText = `Hello, ${user.name}`;
};

function onClick() {
  event.preventDefault();
  let user = new User();
  getData(user);
  switch (event.target.value) {
    case "Login": {
      if (inputs.email === User.email && inputs.password === User.password) {
        sayHi();
      } else fault(errorMessage.wLogin);
      break;
    }
    case "Register":
      break;
    default:
      break;
  }
}
