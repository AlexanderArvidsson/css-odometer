/**
 * @author Alexander Arvidsson <alexander@arvidson.com>
 */

(function () {
  const ODOMETER_COUNT = 20;

  const createOdometer = (element) => {
    if (element.classList.contains("odometer--initialized")) return;

    const number = element.innerHTML;

    element.classList.add("odometer--initialized");
    element.innerHTML = "";

    const [, suffix] = number.match(/\d+([^\d]*)/);

    number.split("").forEach((char) => {
      if (!char.match(/\d/)) return;

      const num = +char;

      const index =
        element.getAttribute("data-animate-zero") != "false"
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
      container.appendChild(spinner);

      // Animate spinner to correct place next frame
      setTimeout(() => {
        spinner.style["transform"] = `translateY(${
          (index / ODOMETER_COUNT) * -100
        }%)`;
      }, 100);

      // Create spinner numbers
      Array(ODOMETER_COUNT)
        .fill("")
        .forEach((_, i) => {
          const num = document.createElement("div");
          num.innerText = i % 10;

          spinner.appendChild(num);
        });

      element.appendChild(container);
    });

    // Fade in suffix if we have one
    if (suffix) {
      const text = document.createElement("span");
      text.className = "odometer-span";
      text.innerText = suffix;

      setTimeout(() => {
        text.classList.add("odometer-span--visible");
      }, 1000);

      element.appendChild(text);
    }
  };

  const elements = document.querySelectorAll(".odometer");
  const observer = new IntersectionObserver(
    (entries) => {
      entries
        .filter((entry) => entry.isIntersecting)
        .forEach((entry) => createOdometer(entry.target));
    },
    {
      root: null,
      rootMargin: "0px",
      threshold: 1,
    }
  );

  elements.forEach((el) => observer.observe(el));
})();
