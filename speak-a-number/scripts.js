// Import DOm element
const msgEl = document.getElementById('msg');


// call a function to get a random number
const randomNum = getRandomNumber();

console.log('Number is: ' + randomNum);

window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

let recognition = new window.SpeechRecognition();

// Start recognition game
recognition.start();

function getRandomNumber() {
    return Math.floor(Math.random() * 100) + 1
}