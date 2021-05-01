// add DOm imports
const balance = document.getElementById('balance');
const money_plus = document.getElementById('money-plus');
const money_minus = document.getElementById('money-minus');
const form = document.getElementById('form');
const list = document.getElementById('list');
const text = document.getElementById('text');
const amount = document.getElementById('amount');


// construction array 
const dummyTransaction = [
    { id: 1, text: 'flowers', amount: -45},
    { id: 2, text: 'Wages', amount: 800},
    { id: 3, text: 'Aldi', amount: -40},
    { id: 4, text: 'Diesel', amount: -60},
    { id: 5, text: 'X-box', amount: -15},
    { id: 6, text: 'PayPal-Alex', amount: 20}
];

let transactions = dummyTransaction;

// Add Transaction
function addTransaction(e) {
    e.preventDefault();  // prevent the default submit action

    // check for text as well as value from the form input fields
    if(text.value.trim() === '' || amount.value.trim() === '') {
        alert('Please add text as well as an amount')
    } else {

    }
}



// Add transactions to the DOM
function addTransactionDOM(transaction) {
    // Get pos neg value indicator of transaction
    const sign = transaction.amount < 0 ? '-' : '+';

    const item = document.createElement('li');

    // Add class based on pos neg value
    item.classList.add(transaction.amount < 0 ? 'minus' : 'plus');

    // add the sign and the absolute value of the number
    item.innerHTML = `
    ${transaction.text} <span>${sign}${Math.abs(transaction.amount)}</span>
    <button class="delete-btn"><i class="fas fa-trash-alt"></i></button>`;

    // append item to the list item
    list.appendChild(item);
}

// Update the income & expense balance
function updateValues() {
    const amounts = transactions.map(transaction => 
        transaction.amount);

        // use reduce to total all items in the array
        const total = amounts.reduce((accumulator, item) => (accumulator += item), 0)
        .toFixed(2);

        // use filer to grab all positive values then reduce to add them together
        const income = amounts.filter(item => item > 0)
        .reduce((accumulator, item) => (accumulator += item), 0)
        .toFixed(2);

        // filer to grab all neg values then reduce to add them together 
        // and multiply by -1 to return an absolute number
        const expense = (amounts.filter(item => item < 0)
        .reduce((accumulator, item) => (accumulator += item), 0) * -1)
        .toFixed(2);

        balance.innerText = `€${total}`;
        money_plus.innerText = `€${income}`;
        money_minus.innerText = `€${expense}`;
}

// Initiate the list
function init() {
    list.innerHTML = '';

    transactions.forEach(addTransactionDOM);
    updateValues();
}

init();

// Event listeners
form.addEventListener('submit', addTransaction)