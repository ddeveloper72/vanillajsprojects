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
    console.log('Breathe In!');

    setTimeout(() => {

        console.log('Hold');

        setTimeout(() => {
            console.log('Breathe Out...');
        }, holdTime);

    }, breatheTime);
}
