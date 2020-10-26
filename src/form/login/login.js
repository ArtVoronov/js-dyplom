import { INVALID_CLASS, ACTIVE_CLASS, ERROR_MESSAGE } from "../../js/constants";
import { users } from "../../js/users";
import { NodeExtendedUtils } from "../../js/utils";
import { AlertMessage } from "../alert";
import { template } from "./template";

export function mountLogin() {
  const form = NodeExtendedUtils.createFromTemplate(template);

  const emailInput = form.querySelector("#email");
  const passwordInput = form.querySelector("#password");
  const submit = form.querySelector("#submit");

  let alert = null;

  emailInput.addEventListener("input", inputEventHandler);
  passwordInput.addEventListener("input", inputEventHandler);
  submit.addEventListener("click", onClick);
  setSubmitState();

  function inputEventHandler(event) {
    const hasInvalidClass = event.target.classList.contains(INVALID_CLASS);
    const isValid = event.target.value !== "";

    if (!hasInvalidClass && !isValid) {
      event.target.classList.add(INVALID_CLASS);
    }

    if (hasInvalidClass && isValid) {
      event.target.classList.remove(INVALID_CLASS);
    }

    setSubmitState();
  }

  function onClick(event) {
    event.preventDefault();
    let className;
    const user = users.find(({ email }) => email === emailInput.value);
    if (user && passwordInput.value === user.password) {
      alert = `Hi, there ${user.name}`;
      className = "ok";
    } else {
      alert = ERROR_MESSAGE["wLogin"];
      className = "alert";
    }

    AlertMessage(alert, className);
  }

  function setSubmitState() {
    submit.disabled = !(emailInput.value && passwordInput.value);
  }

  return form;
}
