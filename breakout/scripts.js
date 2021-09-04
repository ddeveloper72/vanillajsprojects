const rulesBtn = document.getElementById('rules-btn');
const rules = document.getElementById('rules');
const closeBtn = document.getElementById('close-btn');
const canvas = document.getElementById('canvas');

const ctx = canvas.getContext('2d');

// Create ball properties (object)
// dx horizontal dy vertical direction
const ball = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    size: 10,
    speed: 4,
    dx: 4,
    dy: -4
}

// Create paddle properties (object)

const paddle = {
    x: canvas.width / 2 -40,
    y: canvas.height - 20,
    w: 80,
    h: 10,
    speed: 8,
    dx: 0
}

// Draw ball on canvas
function drawBall() {

    // Beginning a drawings:  https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Drawing_shapes
    ctx.beginPath();

    // Drawing an arc: arc(x, y, radius, startAngle, endAngle, counterclockwise)
    ctx.arc(ball.x, ball.y, ball.size, 0, Math.PI * 2);
    ctx.fillStyle = '#0095dd';
    ctx.fill();
    ctx.closePath();
}

// Draw paddle on canvas
function drawPaddle() {
    ctx.beginPath();
    // Drawings filled rectangle: fillRect(x, y, width, height)
    ctx.fillRect(paddle.x, paddle.y, paddle.w, paddle.h);
    ctx.fillStyle = '#0095dd';
    ctx.fill();
    ctx.closePath();
}

// Draw everything
function draw() {
    drawBall();
    drawPaddle();
}

draw();

// Rules and close Event listeners
rulesBtn.addEventListener('click', () => 
rules.classList.add('show'));

closeBtn.addEventListener('click', () => 
rules.classList.remove('show'));
