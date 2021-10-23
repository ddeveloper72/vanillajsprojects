// Import DOm element
const msgEl = document.getElementById('msg');


// call a function to get a random number
const randomNum = getRandomNumber();

console.log('Number is: ' + randomNum);

window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

let recognition = new window.SpeechRecognition();

// Start recognition game
recognition.start();

// Capture user voice when speaking
function onSpeak(e) {
    console.log(e);
}

// Generate a random number
function getRandomNumber() {
    return Math.floor(Math.random() * 100) + 1
}

// Speak result
recognition.addEventListener('result', onSpeak);