// add dom imports
const days = document.getElementById('days');
const hours = document.getElementById('hours');
const minute = document.getElementById('minutes');
const seconds = document.getElementById('seconds');
const countdown = document.getElementById('countdown');

// get current year
const currentYear = new Date().getFullYear();

// inject current year string into newYear time
const newYearTime = new Date(`January 01 ${currentYear +1} 00:00:00`);


// update the countdown
function updateCountdown() {
    const currentTime = new Date();
    const diff = newYearTime - currentTime;

    // get diff in milliseconds
    console.log(diff);

    // 60 to get minutes / 60 to get hours / 24 to get days
    const d = Math.floor(diff / 1000 / 60 / 60 / 24);
    console.log(d + ' days');
    const h = Math.floor(diff / 1000 / 60 / 60) % 24;
    console.log(h + ' hours');
    const m = Math.floor(diff / 1000 / 60 ) % 60;
    console.log(m + ' minutes');
    const s = Math.floor(diff / 1000) % 60;
    console.log(s + ' seconds');
}

updateCountdown();