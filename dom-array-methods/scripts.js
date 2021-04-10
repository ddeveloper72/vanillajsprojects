// collect DOM elements
const addUserBtn = document.getElementById('add-user');
const doubleMoneyBtn = document.getElementById('double');
const showMillionaireBtn = document.getElementById('show-millionaires');
const sortBtn = document.getElementById('sort');
const calculateWealthBtn = document.getElementById('calculate-wealth');
const main = document.getElementById('main');


let data = [];

// fetch a random user from API
async function getRandomUser() {
    const res = await fetch('https://randomuser.me/api');
    
}