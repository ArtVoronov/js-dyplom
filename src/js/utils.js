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
    return body.firstElementChild;
  }

  addToClassList(...classes) {
    this.element.classList.add(...classes);
  }

  addEventListnerToElement(event, callback) {
    this.element.addEventListner(event, callback);
  }

  appendTo(to = document.body) {
    this.element.append(this.element);
  }

  deleteElement() {
    this.element.remove();
  }
}
