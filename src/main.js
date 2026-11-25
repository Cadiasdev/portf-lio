import { site } from "./data.js?v=site-audit-1";
import { header, portfolio, footer } from "./components.js?v=site-audit-1";

document.querySelector("#site-header").innerHTML = header(site);
document.querySelector("#conteudo").innerHTML = portfolio(site);
document.querySelector("#site-footer").innerHTML = footer(site);

const menuButton = document.querySelector(".menu-toggle");
const navigation = document.querySelector(".main-nav");
const setMenuOpen = open => {
  menuButton.setAttribute("aria-expanded", String(open));
  menuButton.setAttribute("aria-label", open ? "Fechar navegação" : "Abrir navegação");
  navigation.classList.toggle("is-open", open);
  document.body.classList.toggle("menu-open", open);
};

menuButton.addEventListener("click", () => setMenuOpen(menuButton.getAttribute("aria-expanded") !== "true"));
navigation.querySelectorAll("a").forEach(link => link.addEventListener("click", event => {
  const target = document.getElementById(link.hash.slice(1));
  if (!target) {
    setMenuOpen(false);
    return;
  }
  event.preventDefault();
  setMenuOpen(false);
  if (window.location.hash !== link.hash) history.pushState(null, "", link.hash);
  const behavior = window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth";
  target.scrollIntoView({ behavior, block: "start" });
}));
document.addEventListener("keydown", event => { if (event.key === "Escape") setMenuOpen(false); });

const headerElement = document.querySelector(".site-header");
const stackBand = document.querySelector(".stack-band");
const updateScrollState = () => {
  const hasScrolled = window.scrollY > 18;
  headerElement.classList.toggle("is-scrolled", hasScrolled);
  stackBand?.classList.toggle("is-visible", hasScrolled);
};
updateScrollState();
window.addEventListener("scroll", updateScrollState, { passive: true });

const revealItems = document.querySelectorAll("[data-reveal]");
if ("IntersectionObserver" in window && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("is-visible");
      revealObserver.unobserve(entry.target);
    });
  }, { threshold: 0.12 });
  revealItems.forEach(item => revealObserver.observe(item));
} else {
  revealItems.forEach(item => item.classList.add("is-visible"));
}
