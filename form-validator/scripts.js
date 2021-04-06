
// collect all the dom elements

const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password2 = document.getElementById('password2');


// Show input error message
function showError(input, message) {
    const fromControl = input.parentElement;

    // search the DOM for matching css selector
    const small = fromControl.querySelector('small');

    // updated class names
    fromControl.className = 'form-control error';

    // replace the inner txt for the element with the small class
    small.innerText = message;
}

// Event listeners


// Show input success 
function showSuccess(input) {
    const fromControl = input.parentElement;
    fromControl.className = 'form-control success';
}

form.addEventListener('submit', function (e) {
    e.preventDefault();

    if(username.value === '') {
       showError(username, 'Username is required') 
    } else {
        showSuccess(username);
    }
});