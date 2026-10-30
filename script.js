const menuButton = document.querySelector(".menu-toggle");
const mainNav = document.querySelector("#main-nav");

if (menuButton && mainNav) {
  menuButton.addEventListener("click", () => {
    const expanded = menuButton.getAttribute("aria-expanded") === "true";
    menuButton.setAttribute("aria-expanded", String(!expanded));
    menuButton.setAttribute("aria-label", expanded ? "Open menu" : "Close menu");
    mainNav.classList.toggle("is-open", !expanded);
  });

  mainNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      menuButton.setAttribute("aria-expanded", "false");
      menuButton.setAttribute("aria-label", "Open menu");
      mainNav.classList.remove("is-open");
    });
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      menuButton.setAttribute("aria-expanded", "false");
      menuButton.setAttribute("aria-label", "Open menu");
      mainNav.classList.remove("is-open");
      menuButton.focus();
    }
  });
}

const contactForm = document.querySelector("#contact-form");
if (contactForm) {
  const inquiry = new URLSearchParams(window.location.search).get("inquiry");
  const topic = contactForm.elements.topic;
  if (inquiry && topic) {
    const match = Array.from(topic.options).find((option) => option.text.toLowerCase().includes(inquiry.toLowerCase()));
    if (match) topic.value = match.value;
  }

  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const values = new FormData(contactForm);
    const body = [
      `Name: ${values.get("name")}`,
      `Email: ${values.get("email")}`,
      `Company: ${values.get("company") || "Not provided"}`,
      `Topic: ${values.get("topic")}`,
      "",
      values.get("message"),
    ].join("\n");
    const subject = `Website inquiry: ${values.get("topic")}`;
    window.location.href = `mailto:hello@vmsolutions.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  });
}
