// Import DOm element
const msgEl = document.getElementById('msg');


// call a function to get a random number
const randomNum = getRandomNumber();

console.log('Number is: ' + randomNum);

function getRandomNumber() {
    return Math.floor(Math.random() * 100) + 1
}