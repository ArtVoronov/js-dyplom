import { NodeExtendedUtils } from "../js/utils";
import { mountLogin } from "./login/login";
import { mountRegister } from "./register/register";
import { template } from "./template";

export const mountForm = () => {
  const form = NodeExtendedUtils.createFromTemplate(template);
  const loginForm = mountLogin();
  //   const registerForm = mountRegister();

  form.append(loginForm);
  return form;
};
