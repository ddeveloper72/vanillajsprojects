// Import DOM elements
const form = document.getElementById('form');
const search = document.getElementById('search');
const result = document.getElementById('result');
const more = document.getElementById('more');


// Import API from https://musicbrainz.org/
const apiURL = 'https://musicbrainz.org/ws/2';

// reference https://musicbrainz.org/doc/MusicBrainz_API/Search for search type annotations with
// related fields
async function searchSongs(term) {
    const res = await fetch(`${apiURL}/recording/?query=${term}&limit=10&fmt=json`);
    const data = await res.json();

    // console.log(data);
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
    `;
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
});
