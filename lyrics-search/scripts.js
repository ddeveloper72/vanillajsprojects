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
    const res = await fetch(`${apiURL}/recording/?query=${term}&fmt=json`);
    const data = await res.json();

    showsData(data);
}

// Show song and artist in DOM
function showsData(data) {

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
