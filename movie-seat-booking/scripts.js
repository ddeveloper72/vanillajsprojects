// collect the DOM elements
const container = document.querySelector('.container');
const seats = document.querySelectorAll('.row .seat:not(.occupied)'); // use css class syntax
const count = document.getElementById('count');
const total = document.getElementById('total');
const movieSelect = document.getElementById('movie');

populateUI();


let ticketPrice = +movieSelect.value; // set type from string to number & use let

// save selected movie index & price
function setMovieData(movieIndex, moviePrice) {
    localStorage.setItem('selectedMovieIndex', movieIndex);
    localStorage.setItem('selectedMoviePrice', moviePrice);
}

// Updated the ticket price totals for number of seats selected
function updateSelectedCount() {
    // add all selected seats to an empty node-list
    const selectedSeats = document.querySelectorAll('.row .seat.selected');

    // convert node list into and array then store indexes of seats in the array
    const seatsIndex = [...selectedSeats].map(seat =>
        [...seats].indexOf(seat)
    );

    // save to local localStorage
    localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex));

    const selectedSeatsCount = selectedSeats.length;  // get number of selected

    count.innerText = selectedSeatsCount;
    total.innerText = selectedSeatsCount * ticketPrice;
}

// get data from localStorage and populate UI
function populateUI() {
    const selectedSeats =  JSON.parse(localStorage.getItem('selectedSeats'))

    // if selected seats is present and the array is not empty
    if(selectedSeats !== null && selectedSeats.length > 0) {
        seats.forEach((seat, index) => {

            // if the seat index is within the array...
            if(selectedSeats.indexOf(index) > -1) {
                seat.classList.add('selected');
            }
        });
    }

    const selectedMovieIndex = localStorage.getItem('selectedMovieIndex');

    // if selected movie index is present
    if(selectedMovieIndex !== null) {
        movieSelect.selectedIndex = selectedMovieIndex;
    }
}

// Movie select event
movieSelect.addEventListener('change', e => {
    ticketPrice = +e.target.value;
    setMovieData(e.target.selectedIndex, e.target.value);
    updateSelectedCount();
});

// Seat click element
container.addEventListener('click', (e) => {
    // console.log(e.target); // find target element
    if (
        e.target.classList.contains('seat') &&
        !e.target.classList.contains('occupied')
    ) {
        e.target.classList.toggle('selected');

        updateSelectedCount();
    }
})