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
    console.log(data);
    showData(data);
}

// Increment API offset by 1
async function nextPage(
    term = getTerm()
) {
    page++;
    const res = await fetch(`${apiURL}/recording/?query=${term}&offset=${page}&limit=${limit}&fmt=json`);
    const data = await res.json();
    console.log(data);
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
                    <span><strong>${song["artist-credit"][0].artist.name}</strong> - ${song.title}</span>
                    <button class="btn" data-artist="${song["artist-credit"][0].artist.name}"
                        data-songtitle="${song.title}">Get Lyrics</button>
                </li>`
            )
            .join('')}
        </ul> 
        <p>Page ${page +1}</P>   
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
    // console.log('📢 ' + searchTerm);
    // reload page, so data form local storage is then read
    // window.location.reload();
});

function getTerm() {
    const word = JSON.parse(localStorage.getItem('searchTerm'));

    console.log('📢 ' + word);

    return word;
}
