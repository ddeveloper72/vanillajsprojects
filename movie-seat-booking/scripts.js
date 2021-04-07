// collect the DOM elements
const container = document.querySelector('.container');
const seats = document.querySelectorAll('row .seat:not(.occupied)'); // use css class syntax
const count = document.getElementById('count');
const total = document.getElementById('total');
const movieSelect = document.getElementById('movie');


const ticketPrice = +movieSelect.value; // set type from string to number

container.addEventListener('click', (e) => {
    // console.log(e.target); // find target element
    if(
        e.target.classList.contains('seat') &&
        !e.target.classList.contains('occupied')
    ) {
        e.target.classList.toggle('selected');
    }
})