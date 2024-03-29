// collect DOM elements
const video = document.getElementById('video')
const play = document.getElementById('play')
const stop = document.getElementById('stop')
const progress = document.getElementById('progress')
const timestamp = document.getElementById('timestamp')
const mute = document.getElementById('mute');
const volinc = document.getElementById('volinc');
const voldec = document.getElementById('voldec');

// Play and pause the video
function toggleVideoStatus() {

    // use API route to video tag
    if (video.paused) {
        video.play();
    } else {
        video.pause();
    }
}

// Update play/pause icon
function updatePlayIcon() {
    // update the html element with id for play
    if (video.paused) {
        play.innerHTML = `<i class="fa fa-play fa-2x"></i>`
    } else {
        play.innerHTML = `<i class="fa fa-pause fa-2x"></i>`
    }
}

// Update progress and timestamp
function updateProgress() {
    // update progress value on the HTML as a %, so CSS can draw
    progress.value = (video.currentTime / video.duration) * 100;

    // get minutes
    let mins = Math.floor(video.currentTime / 60);
    if(mins < 10) {
        mins = '0' + String(mins)
    }

    // get seconds
    let secs = Math.floor(video.currentTime % 60)
    if(secs < 10) {
        secs = '0' + String(secs);
    }

    timestamp.innerHTML = `${mins}:${secs}`;
}


// set vide time to progress
function setVideoProgress() {
    // calculate the video location based a % of the value * duration
    video.currentTime = (+progress.value * video.duration) / 100;
}


// function stop video
function stopVideo() {
    // return the video to the 0 time stamp, then pause
    video.currentTime = 0;
    video.pause();
}

// function mute video
function toggleSound() {
    video.muted = !video.muted;

    // add muted class to enable css color change on button
    if (!video.muted) {
        mute.innerHTML = `<i class="fa fa-volume-mute fa-2x muted"></i>`
    } else {
        mute.innerHTML = `<i class="fa fa-volume-mute fa-2x"></i>`
    }
}

// Change volume direction
var alterVolume = function(dir) {
    var currentVolume = Math.floor(video.volume * 10) / 10;
    if (dir == '+') {
        if (currentVolume < 1) video.volume += 0.1;
    }
    else if (dir == '-') {
        if (currentVolume > 0) video.volume -= 0.1;
    }
}

// Event listeners
video.addEventListener('click', toggleVideoStatus);
video.addEventListener('play', updatePlayIcon);
video.addEventListener('pause', updatePlayIcon);
video.addEventListener('timeupdate', updateProgress);

play.addEventListener('click', toggleVideoStatus);
stop.addEventListener('click', stopVideo);
progress.addEventListener('change', setVideoProgress);

mute.addEventListener('click', toggleSound );

volinc.addEventListener('click', function(e) {
    alterVolume('+');
});

voldec.addEventListener('click', function(e) {
    alterVolume('-')
});