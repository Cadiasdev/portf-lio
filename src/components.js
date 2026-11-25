const esc = (value = "") => String(value).replace(/[&<>"']/g, char => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[char]);
const lines = value => esc(value).replace(/\n/g, "<br />");
const arrow = `<svg aria-hidden="true" viewBox="0 0 20 20" fill="none"><path d="M4 10h11m-5-5 5 5-5 5" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
const externalArrow = `<svg aria-hidden="true" viewBox="0 0 20 20" fill="none"><path d="M6 14 14 6M7 6h7v7" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>`;

export function header(site) {
  const links = site.navigation.map(item => `<a href="${esc(item.href)}">${esc(item.label)}</a>`).join("");
  return `<header class="site-header" id="topo">
    <a class="brand" href="#inicio" aria-label="${esc(site.name)}, início"><img class="brand__logo" src="/img.hero/logo-eduardo.png" alt="" aria-hidden="true" /><span class="brand__name">${esc(site.name)}</span></a>
    <nav class="main-nav" id="main-nav" aria-label="Navegação principal">${links}</nav>
    <a class="header-cta" href="#contacto"><span>Contacto</span><span class="button-arrow">${arrow}</span></a>
    <button class="menu-toggle" type="button" aria-label="Abrir navegação" aria-expanded="false" aria-controls="main-nav"><span></span><span></span></button>
  </header>`;
}

function heroServices(items) {
  return items.map(item => `<li class="service-item"><span class="service-item__number">${esc(item.number)}</span><span class="service-item__title">${esc(item.title)}</span><span class="service-item__detail">${esc(item.detail)}</span></li>`).join("");
}

function technologyList(items) {
  return items.map(item => `<span class="tech-pill"><span class="tech-pill__dot" aria-hidden="true"></span>${esc(item)}</span>`).join("");
}

function serviceCard(item) {
  const included = item.includes.map(value => `<li>${esc(value)}</li>`).join("");
  return `<article class="offering-card" data-reveal>
    <span class="offering-card__number">${esc(item.number)}</span>
    <h3>${esc(item.name)}</h3>
    <p class="offering-card__subtitle">${esc(item.subtitle)}</p>
    <p class="offering-card__description">${esc(item.description)}</p>
    <div class="offering-card__includes"><span>Inclui:</span><ul>${included}</ul></div>
  </article>`;
}

function projectArtwork(item) {
  return `<div class="project-preview__content"><span class="project-preview__title">${esc(item.visualTitle)}</span></div><span class="project-preview__orb" aria-hidden="true"></span>`;
}

function projectCard(item) {
  const projectUrl = esc(item.href);
  const competencies = item.competencies.map(value => `<li>${esc(value)}</li>`).join("");
  return `<article class="project-card" data-reveal>
    <a class="project-card__visual visual--${esc(item.visual)}" href="${projectUrl}" target="_blank" rel="noopener noreferrer" aria-label="${esc(item.name)} — Explorar projecto (abre num novo separador)">
      <div class="visual-art" role="img" aria-label="${esc(item.visualAlt)}">${projectArtwork(item)}</div>
      <span class="visual-link" aria-hidden="true">${externalArrow}</span>
    </a>
    <div class="project-card__body"><p class="project-card__category">${esc(item.category)}</p><h3>${esc(item.name)}</h3><p class="project-card__description">${esc(item.description)}</p>
      <ul class="project-card__competencies" aria-label="Competências">${competencies}</ul>
      <a class="text-link" href="${projectUrl}" target="_blank" rel="noopener noreferrer" aria-label="${esc(item.name)} — Explorar projecto (abre num novo separador)">Explorar projecto ${arrow}</a>
    </div>
  </article>`;
}

function processStep(step) {
  return `<li class="process-step" data-reveal><span class="process-step__number">${esc(step.number)}</span><h3>${esc(step.name)}</h3><p>${esc(step.text)}</p><p class="process-step__objective"><b>O objectivo:</b> ${esc(step.objective)}</p></li>`;
}

const whatsappIcon = `<svg viewBox="0 0 24 24" aria-hidden="true" fill="none"><path d="M20 11.7a8 8 0 0 1-11.8 7l-4.2 1.1 1.1-4.1A8 8 0 1 1 20 11.7Z" stroke="currentColor" stroke-width="1.6"/><path d="M8.5 8.2c.2-.4.4-.4.7-.4h.4c.2 0 .3.1.4.4l.6 1.4c.1.2.1.4 0 .5l-.5.6c-.1.2-.2.3 0 .5.5.8 1.1 1.4 1.9 1.8.2.1.3.1.5-.1l.7-.8c.2-.2.3-.2.5-.1l1.4.7c.2.1.3.2.3.4 0 .3-.2.8-.5 1.1-.4.4-.9.6-1.5.5-1.2-.2-2.5-.9-3.7-2-1-.9-1.6-2-1.8-2.9-.2-.7.1-1.3.6-1.6Z" fill="currentColor"/></svg>`;

export function portfolio(site) {
  const highlights = heroServices(site.hero.services);
  const projects = site.projects.items.map(projectCard).join("");
  const services = site.services.items.map(serviceCard).join("");
  const steps = site.process.steps.map(processStep).join("");
  const tech = technologyList(site.technologies.items);
  const techAria = site.technologies.items.join(", ");

  return `<section class="hero" id="inicio" aria-labelledby="hero-title">
    <div class="hero__glow" aria-hidden="true"></div>
    <img class="hero__portrait" src="${esc(site.hero.portrait)}" alt="${esc(site.hero.portraitAlt)}" fetchpriority="high" decoding="async" />
    <div class="hero__content">
      <div class="hero__main">
        <div class="hero__headline"><h1 id="hero-title">${lines(site.hero.title)}</h1>
          <div class="hero__actions"><a class="button button--primary" href="#contacto">${esc(site.hero.ctaPrimary)} <span class="button-arrow">${arrow}</span></a><a class="button button--secondary" href="#projetos">${esc(site.hero.ctaSecondary)} ${externalArrow}</a></div>
        </div>
        <div class="hero__statement"><p>${esc(site.hero.microcopy)}</p></div>
      </div>
      <ol class="services-grid" aria-label="Serviços em destaque">${highlights}</ol>
    </div>
  </section>
  <section class="technology-section stack-band stack-band--pending" id="tecnologias" aria-labelledby="technology-title">
    <div class="technology-section__heading"><span class="section-kicker">${esc(site.technologies.eyebrow)}</span><h2 id="technology-title">${lines(site.technologies.title)}</h2><p>${esc(site.technologies.copy)}</p></div>
    <div class="marquee" aria-label="${esc(techAria)}"><div class="marquee__track"><div class="marquee__group">${tech}</div><div class="marquee__group" aria-hidden="true">${tech}</div></div></div>
  </section>
  <section class="about section-wrap" id="sobre" aria-labelledby="about-title">
    <div class="about__label" data-reveal><span class="section-kicker">${esc(site.about.eyebrow)}</span><span class="about__orb" aria-hidden="true"><img src="/img.hero/logo-eduardo.png" alt="" /></span></div>
    <div class="about__copy" data-reveal><h2 id="about-title">${lines(site.about.title)}</h2>${site.about.paragraphs.map(p => `<p>${esc(p)}</p>`).join("")}<blockquote class="about__featured">${esc(site.about.featured)}</blockquote><div class="about__action"><a class="button button--primary" href="#contacto">${esc(site.about.cta)} <span class="button-arrow">${arrow}</span></a></div></div>
  </section>
  <section class="offerings section-wrap" id="servicos" aria-labelledby="services-title">
    <div class="section-heading" data-reveal><div><span class="section-kicker">${esc(site.services.eyebrow)}</span><h2 id="services-title">${lines(site.services.title)}</h2></div><div class="section-heading__copy"><p>${esc(site.services.intro)}</p></div></div>
    <div class="offering-grid">${services}</div>
  </section>
  <section class="projects section-wrap" id="projetos" aria-labelledby="projects-title">
    <div class="section-heading" data-reveal><div><span class="section-kicker">${esc(site.projects.eyebrow)}</span><h2 id="projects-title">${lines(site.projects.title)}</h2></div><div class="section-heading__copy">${site.projects.paragraphs.map(p => `<p>${esc(p)}</p>`).join("")}</div></div>
    <div class="projects-grid">${projects}</div>
  </section>
  <section class="process section-wrap" id="processo" aria-labelledby="process-title">
    <div class="section-heading section-heading--process" data-reveal><div><span class="section-kicker">${esc(site.process.eyebrow)}</span><h2 id="process-title">${lines(site.process.title)}</h2></div><div class="section-heading__copy">${site.process.paragraphs.map(p => `<p>${esc(p)}</p>`).join("")}</div></div>
    <ol class="process-grid">${steps}</ol>
  </section>
  <section class="contact section-wrap" id="contacto" aria-labelledby="contact-title">
    <div class="contact__inner">
      <div class="contact__copy" data-reveal><span class="section-kicker">${esc(site.contact.eyebrow)}</span><h2 id="contact-title">${lines(site.contact.title)}</h2><p>${esc(site.contact.copy)}</p><p>${esc(site.contact.copySecondary)}</p><div class="availability"><span aria-hidden="true"></span>${esc(site.contact.availability)}</div></div>
      <div class="contact__actions" data-reveal><div class="contact__whatsapp"><span class="contact__whatsapp-icon">${whatsappIcon}</span><span class="contact__whatsapp-label">${esc(site.contact.whatsapp.label)}</span><a class="button" href="${esc(site.contact.whatsapp.href)}" target="_blank" rel="noopener noreferrer">${esc(site.contact.cta)} <span class="button-arrow">${externalArrow}</span></a><p>${esc(site.contact.microcopy)}</p></div></div>
    </div>
  </section>`;
}

export function footer(site) {
  return `<footer class="site-footer section-wrap"><div class="footer-main"><a class="brand brand--footer" href="#inicio" aria-label="${esc(site.name)}, início"><img class="brand__logo" src="/img.hero/logo-eduardo.png" alt="" aria-hidden="true" /><span class="brand__name">${esc(site.name)}</span></a><p>${esc(site.footer.role)}</p><p>${esc(site.footer.statement)}</p></div><nav class="footer-nav" aria-label="Navegação do rodapé">${site.navigation.map(item => `<a href="${esc(item.href)}">${esc(item.label)}</a>`).join("")}</nav><div class="footer-meta"><p>${esc(site.footer.copyright)}</p><p>${esc(site.footer.closing)}</p></div></footer>`;
}
