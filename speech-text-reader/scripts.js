// Import DOm selectors
const main = document.querySelector('main');
const toggleBtn = document.getElementById('toggle');
const textBox = document.getElementById('toggle-box');
const closeBtn = document.getElementById('close');
const voicesSelect = document.getElementById('voices');
const textarea = document.getElementById('text');

// Import data file
const data = [
    {
        image: './img/drink.jpg',
        text: "I'm Thirsty"
    },
    {
        image: './img/food.jpg',
        text: "I'm Hungry"
    },
    {
        image: './img/tired.jpg',
        text: "I'm Tired"
    },
    {
        image: './img/hurt.jpg',
        text: "I'm Hurt"
    },
    {
        image: './img/happy.jpg',
        text: "I'm Happy"
    },
    {
        image: './img/angry.jpg',
        text: "I'm Angry"
    },
    {
        image: './img/sad.jpg',
        text: "I'm Sad"
    },
    {
        image: './img/scared.jpg',
        text: "I'm Scared"
    },
    {
        image: './img/outside.jpg',
        text: 'I Want To Go Outside'
    },
    {
        image: './img/home.jpg',
        text: 'I Want To Go Home'
    },
    {
        image: './img/school.jpg',
        text: 'I Want To Go To School'
    },
    {
        image: './img/grandma.jpg',
        text: 'I Want To Go To Grandmas'
    }
];

// use a for each loop on the crateBox function to crate a box for each object
data.forEach(createBox);


// Create the main element boxe
function createBox(item) {
    const box = document.createElement('div');

    // use destructuring technique to pull the image & text from the item
    // item is an object with these two properties
    const {image, text} = item;

    box.classList.add('box');
    box.innerHTML = `
    <img src="${image}" alt="${text}" />
    <p class="info">${text}</p>
    `;

    main.appendChild(box);
}