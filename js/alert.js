export const fault = (errorMessage) => {
  if (!document.getElementById("alert")) {
    let alert = document.createElement("p");

    alert.innerText = errorMessage;
    alert.className = "alert";
    alert.id = "alert";
    container.append(alert);

    setTimeout(() => {
      alert.remove();
    }, 2000);
    return null;
  }
};
