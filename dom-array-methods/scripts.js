// collect DOM elements
const addUserBtn = document.getElementById('add-user');
const doubleMoneyBtn = document.getElementById('double');
const showMillionaireBtn = document.getElementById('show-millionaires');
const sortBtn = document.getElementById('sort');
const calculateWealthBtn = document.getElementById('calculate-wealth');
const main = document.getElementById('main');


let data = []; // default data array

getRandomUser();
getRandomUser();
getRandomUser();

// fetch a random user from API
async function getRandomUser() {
    const res = await fetch('https://randomuser.me/api');
    const data = await res.json();

    const user = data.results[0];  // get the 1st object from the results array

    const newUser = {
        name: `${user.name.first} ${user.name.last}`,
        money: Math.floor(Math.random() * 1000000)  // make fake money!
    };

    addData(newUser);
}

// Double Money function
function doubleMoney() {
    data = data.map(user => {
        return { ...user, money: user.money * 2};
    });

    updateDOM();
}

// Sort by wealth
function sortByWealthiest() {
    data.sort((a, b) => b.money - a.money); // arr.sort([compareFunction])

    updateDOM();
}

// Add new object to data array
function addData(object) {
    data.push(object);

    updateDOM();
}

// filter by millionaires
function showMillionaire() {
    data = data.filter(user => user.money >= 1000000);

    updateDOM();
}

// calculate total wealth
function calculateWealth() {
    const wealth = data.reduce((accumulator, user) => (
        accumulator += user.money)
        , 0)
    // console.log(formatMoney(wealth));

    const wealthElement = document.createElement('div');
    wealthElement.innerHTML = `<h3>Total Wealth: <strong>${formatMoney(wealth)}</strong></h3>`;
    main.appendChild(wealthElement);
}

// update DOM 
function updateDOM(providedData = data) { // if there is no provided data, use default data
    // Clear main div element by rebuilding div element
    main.innerHTML = `<h2><strong>Person</strong> Wealth</hr>`;

    providedData.forEach(item => {
        // Element construction
        const element = document.createElement('div');
        element.classList.add('person');
        element.innerHTML = 
            `<strong>${item.name}</strong> 
            ${formatMoney(item.money)}`; // wrap money in a format function
        main.appendChild(element);
    });
}

// Format number as currency
function formatMoney(num) {
    // use regex expression as well as concatenate currency symbol
    return '€' + num.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
}

// Event listeners
addUserBtn.addEventListener('click', getRandomUser);
doubleMoneyBtn.addEventListener('click', doubleMoney);
sortBtn.addEventListener('click', sortByWealthiest);
showMillionaireBtn.addEventListener('click', showMillionaire);
calculateWealthBtn.addEventListener('click', calculateWealth);
