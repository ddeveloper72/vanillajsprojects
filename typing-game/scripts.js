// DOM Imports
const settingsBtn = document.getElementById('settings-btn');
const settings = document.getElementById('settings-btn');
const settingsForm = document.getElementById('settings-form');
const difficultySelect = document.getElementById('difficulty');
const word = document.getElementById('word');
const text = document.getElementById('text');
const timeEl = document.getElementById('time');
const scoreEl = document.getElementById('score');
const endgameEl = document.getElementById('end-game-container');

let number = 20;

// list of words for game
async function getWords() {
    const res = await fetch(`https://random-word-api.herokuapp.com//word?number=${number}`);
    
    const data = await res.json();
        
    return data;
}



// Initialize word
let randomWord;

// initialize score
let score = 0;

// Initialize time
let time = 0;

// Generate random word
async function addWordToDom() {
    const words = getWords()
        .then(v => {
            // console.log(v[Math.floor(Math.random() * v.length)]);
            
            randomWord = v[Math.floor(Math.random() * v.length)];

            word.innerHTML = randomWord;
        });
}

// Update Score
function updateScore() {
    score++;
    
    // update DOM
    scoreEl.innerHTML = score;
}

addWordToDom();

// Event listener
text.addEventListener('input', e => {
    const insertedText = e.target.value;
    // console.log(insertedText);
    if(insertedText === randomWord) {
        addWordToDom();
        updateScore();

        // Clear text
        e.target.value = '';
    }
})