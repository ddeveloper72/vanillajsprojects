// Import doc elements
const container = document.getElementById('container');
const text = document.getElementById('text');


// 7.5 seconds to breathe in then breath out
const totalTime = 7500;
const breatheTime = (totalTime / 5) * 2;
const holdTime = totalTime / 5;


// Call the function
breatheAnimation();

function breatheAnimation() {
    text.innerText = 'Breathe In!';

    // add class cor css grow keyframe
    container.className = 'container grow';

    setTimeout(() => {

        text.innerText = '..Hold..';

        setTimeout(() => {
            text.innerText = '...Breathe Out';

            // add class for css shrink keyframe
            container.className = 'container shrink';
        }, holdTime);

    }, breatheTime);
}

// repeat the animation
setInterval(breatheAnimation, totalTime);