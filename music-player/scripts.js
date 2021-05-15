// Import DOM elements
const musicContainer = document.getElementById('music-container');
const title = document.getElementById('title');
const progressContainer = document.getElementById('progress-container');
const progress = document.getElementById('progress');
const audio = document.getElementById('audio');
const cover = document.getElementById('cover');
const prevBtn = document.getElementById('prev');
const playBtn = document.getElementById('play');
const nextBtn = document.getElementById('next');

// Song tittles
const songs = ['bensound-hipjazz', 'bensound-jazzcomedy', 'bensound-jazzyfrenchy', 'bensound-thelounge']

// Keep track of song
let songIndex = 2;

// Initially load song details into DOM
loadSong(songs[songIndex]);

// Update song details
function loadSong(song) {
    title.innerText = song;
    audio.src = `music/${song}.mp3`;
    cover.src = `images/${song}.jpg`;
};

// Play Song
function playSong() {
    musicContainer.classList.add('play');
    // toggle between play and pause font-awesome icons
    playBtn.querySelector('i.fas').classList.remove('fa-play');
    playBtn.querySelector('i.fas').classList.add('fa-pause');

    audio.play();
}

// Pause Song
function pauseSong() {
    musicContainer.classList.remove('play');
    // toggle between play and pause font-awesome icons
    playBtn.querySelector('i.fas').classList.add('fa-play');
    playBtn.querySelector('i.fas').classList.remove('fa-pause');

    audio.pause();
}

// Previous Song
function prevSong() {

    // decrease the index by 1 to go back down the index
    songIndex--;

    // if the song is the 1st one in the index, skip to the last song in the index
    // by calculating the total indexes then subtract 1
    if(songIndex < 0) {
        songIndex = songs.length -1;
    }

    loadSong(songs[songIndex]);

    playSong();
}

// Next Song
function nextSong() {

    // increase the index by 1 to go up the index
    songIndex++;

    // if the song is the last one in the index, skip to the first song in the index
    // by calculating the total indexes then subtract 1
    if (songIndex > songs.length - 1) {
        songIndex = 0;
    }

    loadSong(songs[songIndex]);

    playSong();
}

// Update progress bar
function updateProgress(e) {

    // monitor the audio element target
    // see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/audio
    // for element properties
    const {duration, currentTime} = e.target;
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`;
}

// set progress on progress bar
function setProgress() {

// reference https://developer.mozilla.org/en-US/docs/Web/API/Element/clientWidth
    const width = this.clientWidth;
    console.log(width);
}

// Even Listeners

playBtn.addEventListener('click', () => {
    const isPlaying = musicContainer.classList.contains('play');
    if (isPlaying) {
        pauseSong();
    } else {
        playSong();
    }
})

// Change Song
prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);

// Time/song update
audio.addEventListener('timeupdate', updateProgress);

// Click on progress bar
progressContainer.addEventListener('click', setProgress);