import { INVALID_CLASS, ACTIVE_CLASS } from "../../js/constants";
import {
  NodeExtendedUtils,
  addAlertMessage,
  deleteAlertMessage,
} from "../../js/utils";
import { template } from "./template";

export function mountLogin() {
  debugger;
  const form = NodeExtendedUtils.createFromTemplate(template);

  const email = form.querySelector("#email");
  const password = form.querySelector("#password");
  const submit = form.querySelector("#submit");

  let alert = null;

  email.addEventListener("input", inputEventHandler);
  password.addEventListener("input", inputEventHandler);
  submit.addEventListener("click", onClick);
  setDisableSubmit();

  function inputEventHandler(event) {
    const hasInvalidClass = event.target.classList.contains(ACTIVE_CLASS);
    const isValid = event.target.value !== "";

    if (!hasInvalidClass && !isValid) {
      event.target.classList.add(INVALID_CLASS);
    }

    if (hasInvalidClass && isValid) {
      event.target.classList.remove(INVALID_CLASS);
    }
  }

  function onClick(event) {
    event.preventDefault();
  }

  function setDisableSubmit() {
    submit.disabled = !(email.value && password.value);
  }

  return form;
}
