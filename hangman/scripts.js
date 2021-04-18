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

// Show hidden word
// split each word into letters in an array
// map through the array then return a span element
// then check if the letter is included in correct letters
// else show and empty string
// then join the letters
function displayWord() {
    wordEl.innerHTML = `
        ${selectedWord
            .split('')
            .map(
                letter => `
                    <span class="letter">
                        ${correctLetters.includes(letter) ? letter : ''}
                    </span>
                `
            )
            .join('')}
    `;

    const innerWord = wordEl.innerText.replace(/\n/g, '');
    // console.log(wordEl.innerText);
    // console.log(innerWord);
    if(innerWord === selectedWord) {
        finalMessageEl.innerText = '🎊 Congratulations! You\'ve won! ✨';
        popupEl.style.display = 'flex';
    }
}


displayWord()