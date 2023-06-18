const HTML_IDS = {
  PORTFOLIO_BTN: 'directory-portfolio-btn',
  CONTACT_BTN: 'directory-contact-btn',
  HOME_BTN: 'directory-logo'
};


for (let prop in HTML_IDS) {
  Object.defineProperty(HTML_IDS, prop, { configurable: false, writable: false })
}

export { HTML_IDS }