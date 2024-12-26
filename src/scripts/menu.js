// Toggle Hamburger Menu
document.querySelector(".hamburger").addEventListener("click", () => {
  document.querySelector(".main-nav").classList.toggle("expanded");
  document.querySelector(".hamburger").classList.toggle("expanded");
});

// Set active class on nav when the page is active
const nav = document.querySelector(".main-nav");
const navLinks = nav.querySelectorAll("a");
const currentURL = window.location.href;
navLinks.forEach((link) => {
  if (link.href === currentURL) {
    link.classList.add("active");
  }
});
