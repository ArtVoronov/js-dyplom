export const INVALID_CLASS = "invalid";
export const ACTIVE_CLASS = "active";
export const template = [
  `
    <input placeholder="email" type="text" id="email">
    <input placeholder="password" type="password" id="password">
    <input type="submit" id="submit" value="Login">
`,
  `
    <input placeholder="login" type="text" id="login">    
    <input placeholder="name" type="text" id="name">
    <input placeholder="age" type="text" id="age">
    <input placeholder="email" type="text" id="email">
    <input placeholder="city" type="text" id="city">
    <input placeholder="password" type="password" id="password">
    <input placeholder="repeat password" type="password" id="repeat password">
    <input type="submit" id="submit" value="Register">
`,
];

export const errorMessage = {
  wLogin: "email or password is wrong",
  login: "Please check login",
  name: "Name is empty",
  age: "Age is not a number",
  email: "Email is not email",
  city: "City is empty",
  password: "Password is empty",
  rPassword: "Password don't match",
};

export const regObject = {
  login: /^[^,.]+$/,
  age: /^\d+$/,
  email: /\S+@\S+\.\S+/,
};
