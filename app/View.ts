import { HTML_IDS as $HTML_IDS } from "../constants/htmlIds.js";

let homeBtn = document.getElementById("directory-logo");

class MissingElementError extends Error {
  constructor(message: string) {
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
        throw new MissingElementError(`Element id: ${$HTML_IDS}: ${$HTML_IDS[elem_id]} .`);
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

    this.DOM[$HTML_IDS.HOMEWORK_BTN].addEventListener('click', () => {
      this.chooseAssignment();
    });

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
      (slides[i] as HTMLElement).style.display = "none";
    }
    for (i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(" active", "");
    }
    (slides[this.slideShowIndex - 1] as HTMLElement).style.display = "block";
    dots[this.slideShowIndex - 1].className += " active";
  }

  scrollToElement(elementId) {
    const element = document.querySelector('#' + elementId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }
  chooseAssignment() {
    let assignmentNumb = prompt("Which assignment would you like? 1, 2, or 3. Type only the number.");

    if (assignmentNumb === "1") {
      this.assignment1()
    } else if (assignmentNumb === "2") {
      let name = prompt('What is your name?');
      this.assignment2(name)
    } else if (assignmentNumb === "3") {
      let name = prompt('What is your name?');
      this.assignment3(name);
    } else {
      alert("type a valid number.");
    }

  }

  //prompts
  assignment1() {

    let name = prompt("Hello, What is your name?");
    !name ? name = "Anonymous" : name;

    let age = Number.parseInt(prompt(`${name}, What is your age?`));
    !age ? age = 0 : age;

    let hobby = prompt(`${name}, What is your favorite hobby?`);
    !hobby ? hobby = "unknown hobby" : hobby;

    let str = `Hi, my name is ${name}, I am ${age} years old, and I like ${hobby}.`;

    alert(str);
  }

  //conditionals
  assignment2(name: string) {

    let numbOfGames = Number.parseInt(prompt("How many times do you want to play?"));

    for (let i = 0; i < numbOfGames; i++) {

      let randNumber = (Math.floor(Math.random() * 10)) + 1;

      let userGuess = Number.parseInt(prompt(`${name} guess a number between 1 and 10.`));

      randNumber === userGuess ? alert("Correct") : alert(`Incorrect guess. \n Your guess: ${userGuess}\nAnswer:${randNumber}`);
    }

  }

  assignment3(name: string) {
    let groceryList: string[] = [];

    let groceryItem = prompt(`${name}, Add a grocery item.`);

    if (!groceryItem) {
      alert("No item added");
      return;
    } else {
      groceryList.push(groceryItem);
    }

    let stopper = true;

    while (stopper) {
      alert(groceryList);

      let userReply = prompt("Would you like to add another item? type: yes or no");

      if (userReply.toLowerCase() === "no") {
        stopper = false;
      } else {
        let nextItem = prompt("Add another item.");
        groceryList.push(nextItem);
      }

    }

    groceryList.forEach((item, i) => {
      alert(`Item #${i + 1}: ` + item);
    })

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
