// Import DOM elements
const musicContainer = document.getElementById('music_container');
const title = document.getElementById('title');
const progressContainer = document.getElementById('progress-container');
const progress = document.getElementById('progress');
const audio = document.getElementById('audio');
const cover = document.getElementById('cover');
const prevBtn = document.getElementById('prev');
const playBtn = document.getElementById('play');
const nextBtn = document.getElementById('next');

// Song tittles
const songs = ['bensound-hipjazz', 'bensound-hipjazz', 'bensound-jazzyfrenchy', 'bensound-thelounge']

// Keep track of song
let songIndex = 2;


