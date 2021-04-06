
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

// check if email is an email address
function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}


// Show input success 
function showSuccess(input) {
    const fromControl = input.parentElement;
    fromControl.className = 'form-control success';
}


// Event listeners
form.addEventListener('submit', function (e) {
    e.preventDefault();

    // check username
    if (username.value === '') {
        showError(username, 'Username is required')
    } else {
        showSuccess(username);
    }

    // check email
    if (email.value === '') {
        showError(email, 'Email is required')
    } else if (!validateEmail(email.value)) {
        showError(email, 'Please provide an email address')
    } else {
        showSuccess(email);
    }

    // check password
    if (password.value === '') {
        showError(password, 'Password is required')
    } else {
        showSuccess(password);
    }

    // check password 2
    if (password2.value === '') {
        showError(password2, 'Password 2 is required')
    } else {
        showSuccess(password2);
    }
});