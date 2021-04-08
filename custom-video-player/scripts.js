// collect DOM elements
const video = document.getElementById('video')
const play = document.getElementById('play')
const stop = document.getElementById('stop')
const progress = document.getElementById('progress')
const timestamp = document.getElementById('timestamp')

// Play and pause the video
function toggleVideoStatus() {
    return true;
}

// Update play/pause icon
function updatePlayIcon() {
    return true;
}

// Update progress and timestamp
function updateProgress() {
    return true
}

// set vide time to progress
function setVideoProgress() {
    return true;
}

// function stop video

function stopVideo() {
    return true;
}

// Event listeners
video.addEventListener('click', toggleVideoStatus);
video.addEventListener('play', updatePlayIcon);
video.addEventListener('pause', updatePauseIcon);
video.addEventListener('timeupdate', updateProgress);



play.addEventListener('click', toggleVideoStatus);

stop.addEventListener('click', stopVideo);

progress.addEventListener('change', setVideoProgress);