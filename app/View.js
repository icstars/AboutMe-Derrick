import { HTML_IDS as $HTML_IDS } from "../constants/htmlIds.js";

let homeBtn = document.getElementById("directory-logo");

class MissingElementError extends Error {
  constructor(message) {
    super(message);
    this.name = 'Missing Html Element'
  }
}

class View {
  DOM = [];
  slideShowIndex = 1;

  constructor() {
    for (let elem_id in $HTML_IDS) {
      let elem = document.getElementById($HTML_IDS[elem_id]);
      if (elem) {
        this.DOM[$HTML_IDS[elem_id]] = elem;
      } else {
        throw new MissingElementError(`Element id: ${$id}: ${$id[elem_id]} .`);
      }
    }

    this.currentSlide(1);

    this.DOM[$HTML_IDS.PORTFOLIO_BTN].addEventListener('click', () => {
      this.scrollToElement($HTML_IDS.PORTFOLIO_SECTION);
    })

    this.DOM[$HTML_IDS.HOME_BTN].addEventListener("click", () => {
      window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    });

    this.DOM[$HTML_IDS.CONTACT_BTN].addEventListener('click', () => {
      this.scrollToElement($HTML_IDS.CONTACT_SESSION);
    });

    this.DOM[$HTML_IDS.PREV_BTN_SLIDESHOW].addEventListener('click', () => {
      this.incrementSlideshow(-1);
    });

    this.DOM[$HTML_IDS.NEXT_BTN_SLIDESHOW].addEventListener('click', () => {
      this.incrementSlideshow(1);
    });

    this.DOM[$HTML_IDS.DOT_1].addEventListener('click', () => {
      this.currentSlide(1)
    });

    this.DOM[$HTML_IDS.DOT_2].addEventListener('click', () => {
      this.currentSlide(2)
    });

    this.DOM[$HTML_IDS.DOT_3].addEventListener('click', () => {
      this.currentSlide(3);
    });

    this.assignment1();
  }

  incrementSlideshow(n) {
    this.showSlides(this.slideShowIndex += n);
  }

  currentSlide(n) {
    this.showSlides(this.slideShowIndex = n);
  }

  showSlides(n) {
    let i;
    let slides = document.getElementsByClassName("slide");
    let dots = document.getElementsByClassName("dot");
    if (n > slides.length) { this.slideShowIndex = 1 }
    if (n < 1) { this.slideShowIndex = slides.length }
    for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
    }
    for (i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(" active", "");
    }
    slides[this.slideShowIndex - 1].style.display = "block";
    dots[this.slideShowIndex - 1].className += " active";
  }

  scrollToElement(elementId) {
    const element = document.querySelector('#' + elementId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }

  //prompts
  assignment1() {

    setTimeout(() => {
      let name = prompt("Hello, What is your name?");


      !name ? name = "Anonymous" : name;


      let age = prompt(`${name}, What is your age?`);
      !age ? age = 0 : age;

      let hobby = prompt(`${name}, What is your favorite hobby?`);

      !hobby ? hobby = "unknown hobby" : hobby;

      let str = `Hi, my name is ${name}, I am ${age} years old, and I like ${hobby}.`;

      alert(str);

      this.assignment2(name)
    }, 2000);
  }

  //conditionals
  assignment2(name) {

    let numbOfGames = prompt("How many times do you want to play?");

    for (let i = 0; i < numbOfGames; i++) {
      
      let randNumber = (Math.floor(Math.random() * 5)) + 1;

      let userGuess = prompt(`${name} guess a number between 1 and 5.`);

      userGuess = Number.parseInt(userGuess);

      randNumber === userGuess ? alert("Correct") : alert(`Incorrect guess. \n Your guess: ${userGuess}\nAnswer:${randNumber}`);
    }

  }

}

const view = new View();


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
