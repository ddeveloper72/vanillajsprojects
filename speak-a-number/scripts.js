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
    const msg = e.results[0][0].transcript;
    
    writeMessage(msg);
    checkNumber(msg);
}

// Write what the user speaks
function writeMessage(msg) {
    msgEl.innerHTML = `
        <div>You said: </div>
        <span class="box">${msg}</span>
    `;
}

// Check message against number
function checkNumber(msg) {
    const num = +msg;

    // Check if valid number

}

// Generate a random number
function getRandomNumber() {
    return Math.floor(Math.random() * 100) + 1
}

// Speak result
recognition.addEventListener('result', onSpeak);