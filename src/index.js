const createOdometer = {};
const ODOMETER_COUNT = 20;

for (const element of document.getElementsByClassName("odometer")) {
  const number = element.innerHTML;
  element.innerHTML = "";

  const [, suffix] = number.match(/\d+(.+)/);

  number.split("").forEach((numStr) => {
    if (!numStr.match(/\d/)) return;

    const num = +numStr;

    const index = element.hasAttribute("data-animate-zero")
      ? 10 + num
      : num == 0
      ? 0
      : 10 + num;

    const container = document.createElement("span");
    container.className = "odometer-number";

    // Create spacer
    const spacer = document.createElement("span");
    spacer.innerText = "0";
    spacer.className = "odometer-spacer";
    container.appendChild(spacer);

    // Create spinner
    const spinner = document.createElement("div");
    spinner.className = "odometer-spinner";
    spinner.style["transform"] = "translateY(0)";
    setTimeout(() => {
      spinner.style["transform"] = `translateY(${
        (index / ODOMETER_COUNT) * -100
      }%)`;
    }, 0);
    container.appendChild(spinner);

    Array(ODOMETER_COUNT)
      .fill("")
      .forEach((_, i) => {
        const num = document.createElement("div");
        num.innerText = i % 10;

        spinner.appendChild(num);
      });

    element.appendChild(container);
  });

  if (suffix) {
    const text = document.createElement("span");
    text.className = "odometer-span";
    text.innerText = suffix;

    setTimeout(() => {
      text.classList.add("odometer-span--visible");
    }, 1000);

    element.appendChild(text);
  }
}
