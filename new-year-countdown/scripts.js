// add dom imports
const days = document.getElementById('days');
const hours = document.getElementById('hours');
const minute = document.getElementById('minutes');
const seconds = document.getElementById('seconds');
const countdown = document.getElementById('countdown');
const year = document.getElementById('year');
const loading = document.getElementById('loading');

// get current year
const currentYear = new Date().getFullYear();

// inject current year string into newYear time
const newYearTime = new Date(`January 01 ${currentYear +1} 00:00:00`);

// set background year
year.innerHTML = currentYear + 1;

// update the countdown
function updateCountdown() {
    const currentTime = new Date();
    const diff = newYearTime - currentTime;

    // get diff in milliseconds
    console.log(diff);

    // 60 to get minutes / 60 to get hours / 24 to get days
    const d = Math.floor(diff / 1000 / 60 / 60 / 24);
    // console.log(d + ' days');
    const h = Math.floor(diff / 1000 / 60 / 60) % 24;
    // console.log(h + ' hours');
    const m = Math.floor(diff / 1000 / 60 ) % 60;
    // console.log(m + ' minutes');
    const s = Math.floor(diff / 1000) % 60;
    // console.log(s + ' seconds');

    // inject values into DOM
    days.innerHTML = d;
    // add leading 0 if value is less than 10
    hours.innerHTML = h < 10 ? '0'+ h  : h;
    minutes.innerHTML = m < 10 ? '0' + m : m;
    seconds.innerHTML = s < 10 ? '0' + s : s;
}

// show spinner before countdown
setTimeout(() => {
    loading.remove();
    countdown.style.display = 'flex';
}, 1000);

// update every second
setInterval(updateCountdown, 1000);