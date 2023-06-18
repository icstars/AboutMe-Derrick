import { HTML_IDS as $HTML_IDS } from "../constants/htmlIds.js";

let homeBtn = document.getElementById("directory-logo");
let portfolioBtn = document.getElementById("directory-portfolio-btn");

class MissingElementError extends Error {
  constructor(message) {
    super(message);
    this.name = 'Missing Html Element'
  }
}

class View {
  DOM = [];
  constructor() {
    for (let elem_id in $HTML_IDS) {
      let elem = document.getElementById($HTML_IDS[elem_id]);
      if (elem) {
        this.DOM[$HTML_IDS[elem_id]] = elem;
      } else {
        throw new MissingElementError(`Element id: ${$id}: ${$id[elem_id]} .`);
      }
    }
  }



}

if (!homeBtn | !portfolioBtn) {
  alert("Element is not on the page.")
}

homeBtn.addEventListener("click", () => {
  window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
});

portfolioBtn.addEventListener('click', () => {
  scrollToElement()
})

function scrollToElement(elementId) {
  const element = document.querySelector(elementId);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
  }
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      // Element is visible on the page
      console.log('Element is now visible!');


      // Perform actions or trigger events when the element is visible
      // For example, add a CSS class to the element
      if (entry.target.id == "profileName") {
        homeBtn.style.display = 'none';
        homeBtn.style.opacity = '0';
      }

      entry.target.classList.add('visible');
    } else {
      // Element is no longer visible
      console.log('Element is no longer visible!');


      if (entry.target.id == "profileName") {
        homeBtn.style.display = 'block'
        homeBtn.style.opacity = '1';
        homeBtn.style.transform = 'scale(1)';
      }
      // Perform actions or trigger events when the element becomes hidden
      // For example, remove a CSS class from the element
      entry.target.classList.remove('visible');
    }
  });
});

// Select the element you want to observe
const targetElement = document.querySelector('#profileName');

// Start observing the target element
observer.observe(targetElement);
