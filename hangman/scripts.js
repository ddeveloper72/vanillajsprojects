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
    if (innerWord === selectedWord) {
        finalMessageEl.innerText = '🎊 Congratulations! You\'ve won! ✨';
        popupEl.style.display = 'flex';
    }
}

// Update the wrong letters array
function updateWrongLettersEl() {
    // check if letter is in the wrong letters array else return nothing
    // if the letter is not in the array, show the letter
    wrongLettersEl.innerHTML = `
        ${wrongLetters.length > 0 ? '<p>Wrong</p>' : ''}
        ${wrongLetters.map(letter => `<span>${letter}</span>`)}
    `;

}

// Show notification
function showNotification() {
    // add show class to DOM element for a time
    notificationEl.classList.add('show');

    // use a timer to remove the show class
    setTimeout(() => {
        notificationEl.classList.remove('show');
    }, 2000);
}

// keydown letter press
window.addEventListener('keydown', e => {
    // console.log(e.keyCode);
    // letter key codes run from 65 to 90
    if (e.keyCode >= 65 && e.keyCode <= 90) {
        const letter = e.key;

        if (selectedWord.includes(letter)) {
            // check if letter is already in the correctLetters array
            if (!correctLetters.includes(letter)) {
                // push onto it, the letter
                correctLetters.push(letter);

                // then display word
                displayWord();

            } else {
                // if the letter is already there
                showNotification();
            }

            //  add letter to the wrong letters array
        } else {

            // check if wrong letter is in the wrongLetters array
            if (!wrongLetters.includes(letter)) {
                // push the wrong letter onto the array
                wrongLetters.push(letter);

                updateWrongLettersEl();
            } else {
                // show user the wrong letter used
                showNotification();
            }
        }
    }
});


displayWord()