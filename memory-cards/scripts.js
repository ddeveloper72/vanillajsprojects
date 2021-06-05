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