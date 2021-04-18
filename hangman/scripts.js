// Import DOM elements
const wrongLettersEl = document.getElementById('wrong-letters');
const wordEl = document.getElementById('word');
const popupEl = document.getElementById('popup-container');
const playBtnEl = document.getElementById('play-button');
const finalMessageEl = document.getElementById('final-message');
const notificationEl = document.getElementById('notification-container');


// DOM elements for svg drawing
const figureParts = document.querySelectorAll('.figure-part');

const words = ['hello', 'world', 'head', 'shoe', 'butterfly'];


// select a random word from the words array
let selectedWord = words[Math.floor(Math.random() * words.length)];

// Store correct letters
const correctLetters = [];

// Store wrong letters
const wrongLetters = [];