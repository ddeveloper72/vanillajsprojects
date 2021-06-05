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

// Store card data WIP - hardcoded
const cardsData = [

    {
        question: 'What must a variable begin with?',
        answer: 'a letter, $ or _'
    },
    {
        question: 'What is a variable?',
        answer: 'Container for a piece of data'
    },
    {
        question: 'Example of case Sensitive Variable',
        answer: 'thisIsAVariable'
    }
];

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
    
}