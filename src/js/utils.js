import { ALERT_CONTAINER } from "./constants";
import { users } from "./users";

const parser = new DOMParser();

export const createFromTemplate = (template) => {
  return NodeExtendedUtils.createFromTemplate(template);
};

export class NodeExtendedUtils {
  constructor(template) {
    this.template = template;
    this.element = this.constructor.createFromTemplate(template);
  }

  static createFromTemplate(template) {
    const { body } = parser.parseFromString(template, "text/html");
    return body;
  }

  addToClassList(...classes) {
    this.element.classList.add(...classes);
  }

  addEventListner(event, callback) {
    this.element.addEventListner(event, callback);
  }

  appendTo(...elements) {
    this.element.appendTo(...elements);
  }

  deleteElement() {
    this.element.remove();
  }
}

export function addAlertMessage(message) {
  let alert = document.createElement("div");
  alert.classList.add("alert");
  alert.innerText = message;
  ALERT_CONTAINER.appendChild(alert);
}

export function deleteAlertMessage() {
  ALERT_CONTAINER.removeChild(ALERT_CONTAINER.firstChild);
}
