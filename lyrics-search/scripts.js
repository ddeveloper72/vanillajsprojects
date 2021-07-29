// Import DOM elements
const form = document.getElementById('form');
const search = document.getElementById('search');
const result = document.getElementById('result');
const more = document.getElementById('more');


// Import API from https://musicbrainz.org/
const apiURL = 'https://musicbrainz.org/ws/2';

// API offset - page number
let page = 0;
let limit = 10;



// reference https://musicbrainz.org/doc/MusicBrainz_API/Search for search type annotations with
// related fields
async function searchSongs(
    term = getTerm()
) {
    const response = await fetch(`${apiURL}/recording/?query=${term}&offset=${page}&limit=${limit}&fmt=json`);
    const data = await response.json();

    showData(data);
}

// Increment API offset by 1
async function nextPage(
    term = getTerm()
) {
    page++;
    const res = await fetch(`${apiURL}/recording/?query=${term}&offset=${page}&limit=${limit}&fmt=json`);
    const data = await res.json();

    showData(data);
}

// Decrement API offset by 1
async function prevPage(
    term = getTerm()
) {
    page--;
    const res = await fetch(`${apiURL}/recording/?query=${term}&offset=${page}&limit=${limit}&fmt=json`);
    const data = await res.json();

    showData(data);
}


// Show song and artist in DOM
function showData(data) {
    // used debug tools to determine the end-point expressions
    result.innerHTML = `
        <ul class="songs">
        ${data.recordings
            .map(
                song =>
                    `<li>
                    <span><strong>${song["artist-credit"][0].artist.name}</strong> - ${song.title} - ${song.length}</span>
                    <button class="btn" data-artist="${song.id}"
                        data-songtitle="${song.title}">Get Lyrics</button>
                </li>`
            )
            .join('')}
        </ul> 
        <p>Page ${page + 1}</P>   
    `;

    // get number of recordings 
    const count = data.recordings.length;
    // console.log(count);

    // Add pagination to the number of recordings in the array
    // if the page number is less than the number of recordings, show the nextPage button
    // if on the first page, remove the prevPage button
    // if on the last page, remove the nextPage button
    if (page <= count) {
        more.innerHTML = `
        ${page !== 0 ? `<button class="btn" onclick="prevPage()">Prev</button>` : ''}
        ${page !== count ? `<button class="btn" onclick="nextPage()">Next</button>` : ''}
            `;
    } else {
        more.innerHTML = '';
    }
}


// Get lyrics for song
async function getInformation(artist) {
    const res = await fetch(`${apiURL}/recording/${artist}?inc=artist-credits+isrcs+releases&fmt=json`);
    const data = await res.json();

    // Define a default value for an item if it is not defined
    var noValue = (typeof noValue === 'undefined') ? '🐱‍💻' : noValue;

    // duration of the song in seconds
    let time = data.length / 1000;

    // Convert time into a user friendly format
    // hours, minutes and seconds
    // use ~~ to get determine the whole number without fractional part
    var hrs = ~~(time / 3600);
    var mins = ~~((time % 3600) / 60);
    var secs = ~~(time % 60);  // use modulus operator to get fractional part then apply ~~

    //define output as "1:01" or "2:24:59" or "120:44:59"
    var ret = "";
    if (hrs > 0) {
        ret += hrs + ":" + (mins < 10 ? "0" : "");
    }
    ret += "" + mins + ":" + (secs < 10 ? "0" : "");
    ret += "" + secs;


    if (data.error) {
        result.innerHTML = data.error;
    } else {
        result.innerHTML = `
        <h2><strong>${data.title}, by ${data["artist-credit"][0].name}</strong></h2>
            <ul>
            <li>First Released: ${data["first-release-date"] || noValue} in ${data.releases[0].country || noValue}</li>
            <li>Song Length: ${ret + 's'} </li>
            <li>Title: ${data.releases[0].title || noValue}</li>
            <li>From the Album: ${data.releases[0].title || noValue}</li>
            <li>Group type: ${data["artist-credit"][0].artist.type || noValue}</li>
            <li>Artist type: ${data["artist-credit"][0].artist.disambiguation || noValue}</li>
            </ul>
            
        `;
    }

    more.innerHTML = '';
}

// Event listeners
form.addEventListener('submit', e => {
    e.preventDefault();

    const searchTerm = search.value.trim();

    // add validation for a search term
    if (!searchTerm) {
        alert('please type in a search term');
    } else {
        searchSongs(searchTerm);
    }

    // Add search term to local storage
    localStorage.setItem('searchTerm', JSON.stringify(searchTerm));
});

function getTerm() {
    const word = JSON.parse(localStorage.getItem('searchTerm'));
    return word;
}

// Get lyrics button click
result.addEventListener('click', e => {
    const clickedEl = e.target;

    if (clickedEl.tagName === 'BUTTON') {
        const artist = clickedEl.getAttribute('data-artist');
        console.log(artist);

        getInformation(artist);
    }
});