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
    if (Number.isNaN(num)) {
        msgEl.innerHTML = `<div>That was not a valid number</div>`;
        return;
    }

    // Check if number is in range
    if (num > 100 || num < 1) {
        msgEl.innerHTML = `<div>This number myst be between 1 - 100</div>`;
        return;
    }

    // Check Number
    if (num === randomNum) {
        document.body.innerHTML = `
        <h2>Congratulations! You've guessed the number!<br><br>
        ${num} was the correct number</h2>
        <button class="play-again" id="play-again">Play Again</button>
        `;
    }
    else if (num > randomNum) {
        msgEl.innerHTML +=
            '<div>Go Lower 🔻</div>';
    } else {
        msgEl.innerHTML +=
            '<div>Go Higher 🔺</div>';
    }
}

// Generate a random number
function getRandomNumber() {
    return Math.floor(Math.random() * 100) + 1;
}

// Speak result
recognition.addEventListener('result', onSpeak);

// End speech recognition service
recognition.addEventListener('end', () => recognition.start());

// Reload game 
document.body.addEventListener('click', e => {
    if(e.target.id == 'play-again') {
        window.location.reload();
    }
})