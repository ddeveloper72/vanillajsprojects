// Dome selector imports
const clearBtn = document.getElementById('clear');
const showBtn = document.getElementById('show');
const cardsContainer = document.getElementById('cards-container');
const prevBtn = document.getElementById('prev');
const currentEl = document.getElementById('current');
const nextBtn = document.getElementById('next');
const addContainer = document.getElementById('add-container');
const hideBtn = document.getElementById('hide');
const questionEl = document.getElementById('question');
const answerEl = document.getElementById('answer');
const addCardBtn = document.getElementById('add-card');


// Track Current card.  Add a starting card
let currentActiveCard = 0;

// Store the DOM cards > an array of the elements
const cardsEl = [];

// Store card data
const cardsData = getCardsData();


// const cardsData = [

//     {
//         question: 'What must a variable begin with?',
//         answer: 'a letter, $ or _'
//     },
//     {
//         question: 'What is a variable?',
//         answer: 'Container for a piece of data'
//     },
//     {
//         question: 'Example of case Sensitive Variable',
//         answer: 'thisIsAVariable'
//     }
// ];

// Create all cards
function crateCards() {
    cardsData.forEach((data, index) => createCard(data, index));
}

// create a single card in the DOM
function createCard(data, index) {
    // create card element div
    const card = document.createElement('div');
    // add card class to El
    card.classList.add('card');

    // add active class to card with first index
    if (index === 0) {
        card.classList.add('active');
    }

    // Add inner card markup
    card.innerHTML = `
        <div class="inner-card">
            <div class="inner-card-front">
                <p>${data.question}</p>
            </div>
            <div class="inner-card-back">
                <p>${data.answer}</p>
            </div>
        </div>
    `;

    // add event listener to toggle show-answer
    card.addEventListener('click', () => card.classList.toggle('show-answer'));

    // Add to DOM cards
    cardsEl.push(card);

    // Update the cards container with the new elements
    cardsContainer.appendChild(card);

    updateCurrentText();
}

// Show number of cards
function updateCurrentText() {
    currentEl.innerText = `${currentActiveCard + 1} of ${cardsEl.length}`
}

// Get cards form local storage
function getCardsData() {
    // local storage only stores strings. use JSON to parse
    const cards = JSON.parse(localStorage.getItem('cards'));
    // use shortened ternary if else operator
    return cards === null ? [] : cards;
}

// Add card to local storage
function setCardsData(cards) {
    
}

crateCards();

// Event listeners

// enable next button
nextBtn.addEventListener('click', () => {
    // override the current class name with a new one
    cardsEl[currentActiveCard].className = 'card left';

    // change current active card to the next index value
    currentActiveCard = currentActiveCard + 1;

    if (currentActiveCard > cardsEl.length - 1) {
        // return the card number and calculated from the index
        currentActiveCard = cardsEl.length - 1;
    }

    // set the next selected card to the active class
    cardsEl[currentActiveCard].className = 'card active';

    updateCurrentText();
})

// enable previous button
prevBtn.addEventListener('click', () => {
    // override the current class name with a new one
    cardsEl[currentActiveCard].className = 'card right';

    // change current active card to the next index value
    currentActiveCard = currentActiveCard - 1;

    if (currentActiveCard < 0) {
        // return the card number and calculated from the index
        currentActiveCard = 0;
    }

    // set the next selected card to the active class
    cardsEl[currentActiveCard].className = 'card active';

    updateCurrentText();
})

// Show add container
showBtn.addEventListener('click', () => addContainer.classList.add('show'));


// Hide add container
hideBtn.addEventListener('click', () => addContainer.classList.remove('show'));

// Add card
addCardBtn.addEventListener('click', () => {
    const question = questionEl.value;
    const answer = answerEl.value;
    
    // check if data has been added
    if(question.trim() && answer.trim()) {
        const newCard = {question, answer};

        createCard(newCard);

        // clear input after submission
        questionEl.value = '';
        answerEl.value = '';

        // Hide add container
        addContainer.classList.remove('show');

        // Push new card to the []
        cardsData.push(newCard);
        setCardsData(cardsData);
    }
});