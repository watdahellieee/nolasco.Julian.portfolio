

"use strict";

const pages = document.querySelectorAll("main .page");
const navLinks = document.querySelectorAll(".nav-links a");
const menu = document.querySelector(".nav-links");
const toggle = document.querySelector(".menu-toggle");

function closeMenu() {
  menu.classList.remove("open");
  toggle.setAttribute("aria-expanded", "false");
}

function showPage() {
  const requested = location.hash.slice(1);
  const validPage = [...pages].some(page => page.id === requested);
  const currentPage = validPage ? requested : "home";

  pages.forEach(page => {
    const active = page.id === currentPage;

    page.classList.toggle("active-page", active);
    page.setAttribute("aria-hidden", String(!active));
  });

  navLinks.forEach(link => {
    const active = link.getAttribute("href") === `#${currentPage}`;

    link.classList.toggle("active", active);

    if (active) {
      link.setAttribute("aria-current", "page");
    } else {
      link.removeAttribute("aria-current");
    }
  });

  closeMenu();
  window.scrollTo(0, 0);
}

toggle.addEventListener("click", () => {
  const isOpen = menu.classList.toggle("open");
  toggle.setAttribute("aria-expanded", String(isOpen));
});

document.addEventListener("keydown", event => {
  if (event.key === "Escape") {
    closeMenu();
  }
});

window.addEventListener("hashchange", showPage);

document.getElementById("year").textContent =
  new Date().getFullYear();

showPage();
