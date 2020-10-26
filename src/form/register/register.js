import { INVALID_CLASS, REG_OBJECT } from "../../js/constants";
import { User, users } from "../users";
import { NodeExtendedUtils } from "../../js/utils";
import { template } from "./template";

export function mountRegister() {
  const form = NodeExtendedUtils.createFromTemplate(template);

  const submit = form.querySelector("#submit");

  const formHelper = {
    login: {
      value: "",
      valid: false,
      validationOption() {
        let regexp = new RegExp(REG_OBJECT.login);
        this.login.valid = regexp.test(this.login.value);
      },
    },
    name: {
      value: "",
      valid: false,
      validationOption() {
        this.name.valid = this.name.value.length !== 0;
      },
    },
    age: {
      value: "",
      valid: false,
      validationOption() {
        let regexp = new RegExp(REG_OBJECT.age);
        this.age.valid = regexp.test(this.age.value);
      },
    },
    email: {
      value: "",
      valid: false,
      validationOption() {
        let regexp = new RegExp(REG_OBJECT.email);
        this.email.valid = regexp.test(this.email.value);
      },
    },
    city: {
      value: "",
      valid: false,
      validationOption() {
        this.city.valid = this.city.value.length !== 0;
      },
    },
    password: {
      value: "",
      valid: false,
      validationOption() {
        this.password.valid = this.password.value.length !== 0;
      },
    },
    repeatPassword: {
      value: "",
      valid: false,
      validationOption() {
        this.repeatPassword.valid =
          this.repeatPassword.value === this.password.value;
      },
    },

    checkFormValidation() {
      for (const key in this) {
        if (typeof this[key] !== "function" && !this[key].valid) {
          return false;
        }
      }
      return true;
    },

    getFromData() {
      let user = new User(
        this.login.value,
        this.name.value,
        this.age.value,
        this.email.value,
        this.city.value,
        this.password.value
      );
      return user;
    },
  };

  setSubmitState();

  form.addEventListener("input", (event) => {
    const id = event.target.id;
    const value = event.target.value;

    formHelper[id].value = value;
    formHelper[id].validationOption.call(formHelper);

    handleValidState(event.target, formHelper[id].valid);
    setSubmitState();
  });

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const user = formHelper.getFromData();
    users.push(user);
    console.log(users);
  });

  function setSubmitState() {
    submit.disabled = !formHelper.checkFormValidation();
  }

  function handleValidState(node, isValid) {
    let hasInvalidClass = node.classList.contains(INVALID_CLASS);
    if (!hasInvalidClass && !isValid) {
      event.target.classList.add(INVALID_CLASS);
    }

    if (hasInvalidClass && isValid) {
      event.target.classList.remove(INVALID_CLASS);
    }
  }

  return form;
}
