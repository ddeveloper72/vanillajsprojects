
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
function validateEmail(input) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(re.test(input.value.trim())) {
        showSuccess(input);

    } else {
        showError(input, 'Email is not valid')
    }
}

// check password
function checkPasswordsMatch(input1, input2) {
    if (input1.value !== input2.value) {
        showError(input2, 'Passwords must match');
    }
}

// Show input success 
function showSuccess(input) {
    const fromControl = input.parentElement;
    fromControl.className = 'form-control success';
}


// check required fields
function checkRequired(inputArray) {
    inputArray.forEach(function (input) {
        if (input.value.trim() === '') {
            showError(input, `${getFieldName(input)} is required`);
        } else {
            showSuccess(input);
        }
    });
}

// check input length
function checkLength(input, min, max) {
    if (input.value.length < min) {
        showError(
            input, `${getFieldName(input)} must be at least ${min} characters`);
    } else if (input.value.length > max) {
        showError (
            input, `${getFieldName(input)} must be less that ${max} characters`);
    } else {
        showSuccess(input)
    }
}

// convert input.id to proper case
function getFieldName(input) {
    // convert just 1st letter to upper then splice on remaining text
    return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

// Event listeners
form.addEventListener('submit', function (e) {
    e.preventDefault();

    checkRequired([username, email, password, password2]);
    checkLength(username, 3, 15);
    checkLength(password, 6, 25);
    validateEmail(email);
    checkPasswordsMatch(password, password2);
});