import { CONTAINER } from "../js/constants";
import { NodeExtendedUtils } from "../js/utils";
import { mountLogin } from "./login/login";
import { mountRegister } from "./register/register";
import { template } from "./template";

export const mountForm = () => {
  const form = NodeExtendedUtils.createFromTemplate(template);

  const loginForm = mountLogin();
  const registerForm = mountRegister();

  const formContainer = form.querySelector("#form-container");
  const alertContainer = form.querySelector("#alert-container");

  formContainer.append(registerForm);

  return form;
};
