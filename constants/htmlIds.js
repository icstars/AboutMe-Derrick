const HTML_IDS = {
  PORTFOLIO_BTN: 'directory-portfolio-btn',
  CONTACT_BTN: 'directory-contact-btn',
  HOME_BTN: 'directory-logo',
  ABOUT_ME_SECTION: 'about-me-section',
  PORTFOLIO_SECTION: 'portfolio-section',
  CONTACT_SESSION: 'contact-session',
};


for (let prop in HTML_IDS) {
  Object.defineProperty(HTML_IDS, prop, { configurable: false, writable: false })
}

export { HTML_IDS }