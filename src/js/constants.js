export const INVALID_CLASS = "invalid";
export const ACTIVE_CLASS = "active";
export const CONTAINER = document.getElementById("container");
export const FORM_CONTAINER = document.getElementById("form-container");
export const ALERT_CONTAINER = document.getElementById("alert-container");

export const ERROR_MESSAGE = {
  wLogin: "email or password is wrong",
  login: "Please check login",
  name: "Name is empty",
  age: "Age is not a number",
  email: "Email is not email",
  city: "City is empty",
  password: "Password is empty",
  rPassword: "Password don't match",
};

export const REG_OBJECT = {
  login: /^[^,.]+$/,
  age: /^\d+$/,
  email: /\S+@\S+\.\S+/,
};
