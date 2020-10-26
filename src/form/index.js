import { ACTIVE_CLASS } from "../js/constants";
import { NodeExtendedUtils } from "../js/utils";
import { mountLogin } from "./login/login";
import { mountRegister } from "./register/register";
import { template } from "./template";

export const mountForm = () => {
  const form = NodeExtendedUtils.createFromTemplate(template);

  const loginForm = mountLogin();
  const registerForm = mountRegister();

  const loginSwitcher = form.querySelector("#login");
  const registerSwitcher = form.querySelector("#register");

  loginSwitcher.addEventListener("click", setActiveSwticher);
  registerSwitcher.addEventListener("click", setActiveSwticher);

  const formContainer = form.querySelector("#form-container");

  formContainer.append(loginForm);

  function setActiveSwticher(event) {
    if (
      event.target.id === "login" &&
      !loginSwitcher.classList.contains(ACTIVE_CLASS)
    ) {
      loginSwitcher.classList.add(ACTIVE_CLASS);
      registerSwitcher.classList.remove(ACTIVE_CLASS);
      formContainer.removeChild(registerForm);
      formContainer.append(loginForm);
    }

    if (
      event.target.id === "register" &&
      !registerSwitcher.classList.contains(ACTIVE_CLASS)
    ) {
      registerSwitcher.classList.add(ACTIVE_CLASS);
      loginSwitcher.classList.remove(ACTIVE_CLASS);
      formContainer.removeChild(loginForm);
      formContainer.append(registerForm);
    }
  }

  return form;
};
