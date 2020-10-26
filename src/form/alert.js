export function AlertMessage(alert, className) {
  const alertContainer = document.querySelector("#alert-container");

  alertContainer.innerText = alert;
  alertContainer.classList = className;

  setTimeout(() => {
    alertContainer.innerText = "";
  }, 5000);
}
