import { CONTAINER } from "./constants";
import { mountForm } from "../form/";

const FORM_ROUTE = "/";

const routerConfig = {
  [FORM_ROUTE]: withLoginProtected((user) => {
    const form = mountForm();
    CONTAINER.appendChild(form);
  }),
};

const getTrimedRoute = (path) => {
  return path.replace(/^#/g, "");
};

const router = () => {
  CONTAINER.innerHTML = "";
  const trimmed = window.location.hash
    ? getTrimedRoute(window.location.hash)
    : FORM_ROUTE;
  if (routerConfig[trimmed]) {
    routerConfig[trimmed]();
  } else {
    window.location.hash = NOT_FOUND;
  }
};

export const initRouter = () => {
  window.addEventListener("hashchange", router);
  router();
};

function withLoginProtected(routeFunction) {
  return (...args) => {
    const userData = { name: "Alex" };
    // select from storage
    if (userData) {
      routeFunction(userData, ...args);
    } else {
      window.location.hash = LOGIN_ROUTE;
    }
  };
}
