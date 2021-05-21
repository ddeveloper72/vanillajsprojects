// DOM Imports
const settingsBtn = document.getElementById('settings-btn');
const settings = document.getElementById('settings');
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
let time = 15;

// Set difficulty
let difficulty = localStorage.getItem('difficulty')  !== null ?
localStorage.getItem('difficulty') : 'easy';

// Set difficulty select value
difficultySelect.value = difficulty;

// Focus on text at start
text.focus();

// Start countdown timer
const timeInterval = setInterval(updateTime, 1000);


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

// Update time 
function updateTime() {
    time--;
    timeEl.innerHTML = time + 's';
    if (time === 0) {
        clearInterval(timeInterval)

        // end game
        gameOver();
    }
}

// game over, show end screen
function gameOver() {
    endgameEl.innerHTML = `
    <h1>⌛ Time ran out!</h1>
    <p>Your final score is ${score}</p>
    <button onclick="location.reload()">Reload</button>
    `;

    endgameEl.style.display = 'flex';
}

addWordToDom();

// Event listener
text.addEventListener('input', e => {
    const insertedText = e.target.value;
    // console.log(insertedText);
    if (insertedText === randomWord) {
        addWordToDom();
        updateScore();

        // Clear text
        e.target.value = '';

        if(difficulty === 'hard') {
            time += 2;
        } else if (difficulty === 'medium') {
            time += 6;
        } else {
            time += 8;
        }

        updateTime();
    }
})

// settings button click
settingsBtn.addEventListener('click', () => {
    settings.classList.toggle('hide');
})

// Settings select
settingsForm.addEventListener('change', e => {
    difficulty = e.target.value;
    localStorage.setItem('difficulty', difficulty);

})
