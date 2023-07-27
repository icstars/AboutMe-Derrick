import { HTML_IDS as $HTML_IDS_INDEX } from "../constants/htmlIds.js";
let homeBtn = document.getElementById("directory-logo");
class MissingElementError extends Error {
    constructor(message) {
        super(message);
        this.name = 'Missing Html Element';
    }
}
export class View {
    DOM = [];
    slideShowIndex = 1;
    inputBox = document.createElement('p');
    constructor() {
        for (let elem_id in $HTML_IDS_INDEX) {
            let elem = document.getElementById($HTML_IDS_INDEX[elem_id]);
            if (elem) {
                this.DOM[$HTML_IDS_INDEX[elem_id]] = elem;
            }
            else {
                throw new MissingElementError(`Element id: ${$HTML_IDS_INDEX}: ${$HTML_IDS_INDEX[elem_id]} .`);
            }
        }
        this.currentSlide(1);
        this.DOM[$HTML_IDS_INDEX.PORTFOLIO_BTN].addEventListener('click', () => {
            this.scrollToElement($HTML_IDS_INDEX.PORTFOLIO_SECTION);
        });
        this.DOM[$HTML_IDS_INDEX.HOME_BTN].addEventListener("click", () => {
            window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
        });
        this.DOM[$HTML_IDS_INDEX.CONTACT_BTN].addEventListener('click', () => {
            this.scrollToElement($HTML_IDS_INDEX.CONTACT_SESSION);
        });
        this.DOM[$HTML_IDS_INDEX.PREV_BTN_SLIDESHOW].addEventListener('click', () => {
            this.incrementSlideshow(-1);
        });
        this.DOM[$HTML_IDS_INDEX.NEXT_BTN_SLIDESHOW].addEventListener('click', () => {
            this.incrementSlideshow(1);
        });
        this.DOM[$HTML_IDS_INDEX.DOT_1].addEventListener('click', () => {
            this.currentSlide(1);
        });
        this.DOM[$HTML_IDS_INDEX.DOT_2].addEventListener('click', () => {
            this.currentSlide(2);
        });
        this.DOM[$HTML_IDS_INDEX.DOT_3].addEventListener('click', () => {
            this.currentSlide(3);
        });
        this.DOM[$HTML_IDS_INDEX.HOMEWORK_BTN].addEventListener('click', () => {
            this.DOM[$HTML_IDS_INDEX.MODAL_HW].style.display = "block";
            this.chooseAssignment();
        });
        let span = document.getElementsByClassName("close")[0];
        span.addEventListener('click', () => {
            this.DOM[$HTML_IDS_INDEX.MODAL_HW].style.display = "none";
        });
        window.onclick = (event) => {
            if (event.target == this.DOM[$HTML_IDS_INDEX.MODAL_HW]) {
                this.DOM[$HTML_IDS_INDEX.MODAL_HW].style.display = "none";
            }
        };
        this.inputBox.style.height = "min-content";
        this.inputBox.style.width = "100%";
        this.inputBox.style.display = 'flex';
        this.inputBox.style.flexDirection = 'column';
        this.inputBox.style.padding = '5px';
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
        if (n > slides.length) {
            this.slideShowIndex = 1;
        }
        if (n < 1) {
            this.slideShowIndex = slides.length;
        }
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
    async chooseAssignment() {
        this.inputBox.innerHTML = '';
        this.DOM[$HTML_IDS_INDEX.USER_INPUT_MODAL].value = '';
        let inputNode;
        this.DOM[$HTML_IDS_INDEX.USER_INPUT_SUBMIT_BTN_MODAL].addEventListener('click', () => {
            let assignmentNumb = this.DOM[$HTML_IDS_INDEX.USER_INPUT_MODAL].value;
            if (assignmentNumb == 1) {
                this.assignment1();
            }
            else if (assignmentNumb == 2) {
                let name = prompt('What is your name?');
                this.assignment2(name);
            }
            else if (assignmentNumb == 3) {
                let name = prompt('What is your name?');
                this.assignment3(name);
            }
            else {
                alert("type a valid number.");
            }
        });
        this.DOM[$HTML_IDS_INDEX.MODAL_CONTENT_HW].appendChild(this.inputBox);
    }
    assignment1() {
        this.inputBox.innerText = '';
        let prompt1 = document.createTextNode("Hello, What is your name?");
        this.inputBox.appendChild(prompt1);
        let div = document.createElement("div");
        let div2 = document.createElement("div");
        let div3 = document.createElement("div");
        let input1 = document.createElement("input");
        input1.type = 'text';
        div.appendChild(input1);
        let submit = document.createElement("button");
        submit.textContent = "Submit name";
        submit.style.paddingBottom = '5px';
        div.appendChild(submit);
        this.inputBox.appendChild(div);
        let name;
        let input2;
        let age;
        let submit2 = document.createElement("button");
        let input3;
        let submit3 = document.createElement("button");
        submit.addEventListener('click', () => {
            name = input1.value;
            !name ? name = "Anonymous" : name;
            this.inputBox.style.gap = '20px';
            prompt1.textContent = `${name}, What is your age?`;
            input2 = document.createElement("input");
            input2.type = 'number';
            div2.appendChild(input2);
            submit2.textContent = "submit age";
            div2.appendChild(submit2);
            this.inputBox.appendChild(div2);
        });
        submit2.addEventListener('click', () => {
            age = Number.parseInt(input2.value);
            !age ? age = 0 : age;
            this.inputBox.style.gap = '20px';
            prompt1.textContent = `${name}, What is your favorite hobby?`;
            input3 = document.createElement("input");
            input3.type = 'text';
            div3.appendChild(input3);
            submit3.textContent = "submit hobby";
            div3.appendChild(submit3);
            this.inputBox.appendChild(div3);
        });
        submit3.addEventListener('click', () => {
            this.inputBox.style.gap = '20px';
            let p = document.createElement("p");
            p.textContent = `Hi, my name is ${name}, I am ${age} years old, and I like ${input3.value}.`;
            this.inputBox.appendChild(p);
        });
    }
    assignment2(name) {
        let numbOfGames = Number.parseInt(prompt("How many times do you want to play?"));
        for (let i = 0; i < numbOfGames; i++) {
            let randNumber = (Math.floor(Math.random() * 10)) + 1;
            let userGuess = Number.parseInt(prompt(`${name} guess a number between 1 and 10.`));
            randNumber === userGuess ? alert("Correct") : alert(`Incorrect guess. \n Your guess: ${userGuess}\nAnswer:${randNumber}`);
        }
    }
    assignment3(name) {
        let groceryList = [];
        let groceryItem = prompt(`${name}, Add a grocery item.`);
        if (!groceryItem) {
            alert("No item added");
            return;
        }
        else {
            groceryList.push(groceryItem);
        }
        let stopper = true;
        while (stopper) {
            alert(groceryList);
            let userReply = prompt("Would you like to add another item? type: yes or no");
            if (userReply.toLowerCase() === "no") {
                stopper = false;
            }
            else {
                let nextItem = prompt("Add another item.");
                groceryList.push(nextItem);
            }
        }
        groceryList.forEach((item, i) => {
            alert(`Item #${i + 1}: ` + item);
        });
    }
}
const view = new View();
export { view };
const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            console.log('Element is now visible!');
            if (entry.target.id == "profileName") {
                homeBtn.style.display = 'none';
                homeBtn.style.opacity = '0';
            }
            entry.target.classList.add('visible');
        }
        else {
            console.log('Element is no longer visible!');
            if (entry.target.id == "profileName") {
                homeBtn.style.display = 'block';
                homeBtn.style.opacity = '1';
                homeBtn.style.transform = 'scale(1)';
            }
            entry.target.classList.remove('visible');
        }
    });
});
const targetElement = document.querySelector('#profileName');
observer.observe(targetElement);
//# sourceMappingURL=View.js.map