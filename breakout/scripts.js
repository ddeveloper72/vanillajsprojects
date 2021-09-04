const rulesBtn = document.getElementById('rules-btn');
const rules = document.getElementById('rules');
const closeBtn = document.getElementById('close-btn');
const canvas = document.getElementById('canvas');

const ctx = canvas.getContext('2d');

let score = 0;

// Brick variables
const brickRowCount = 9;
const brickColumnCount = 5;

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
    x: canvas.width / 2 - 40,
    y: canvas.height - 20,
    w: 80,
    h: 10,
    speed: 8,
    dx: 0
}

// Draw brick properties
// specify the default params for 1 brick which will be altered by looping through
// the params so many bricks can be crated at different location and visibility
const brickInfo = {
    w: 70,
    h: 20,
    padding: 10,
    offsetX: 45,
    offsetY: 60,
    visible: true
}

// Create bricks
const bricks = [];
for (let i = 0; i < brickRowCount; i++) {
    bricks[i] = [];
    for (let j = 0; j < brickColumnCount; j++) {
        const x = i * (brickInfo.w + brickInfo.padding) + brickInfo.offsetX;
        const y = j * (brickInfo.h + brickInfo.padding) + brickInfo.offsetY;
        bricks[i][j] = { x, y, ...brickInfo };
    }
}

// Draw ball on canvas
function drawBall() {

    // Beginning a drawings:  https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Drawing_shapes
    ctx.beginPath();

    // Drawing an arc: arc(x, y, radius, startAngle, endAngle, counterclockwise)
    ctx.arc(ball.x, ball.y, ball.size, 0, Math.PI * 2);
    ctx.fillStyle = '#f00';
    ctx.fill();
    ctx.closePath();
}

// Draw paddle on canvas
function drawPaddle() {
    ctx.beginPath();
    // Drawings filled rectangle: fillRect(x, y, width, height)
    ctx.rect(paddle.x, paddle.y, paddle.w, paddle.h);
    ctx.fillStyle = '#0095dd';
    ctx.fill();
    ctx.closePath();
}

// Draw bricks on canvas
function drawBricks() {
    bricks.forEach(column => {
        column.forEach(brick => {
            ctx.beginPath();
            // Reference: https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/rect
            // Do not use fillRect which will not let this function work correctly
            ctx.rect(brick.x, brick.y, brick.w, brick.h);
            ctx.fillStyle = brick.visible ? '#0095dd' : 'transparent';
            ctx.fill();
            ctx.closePath;
        })
    })
}

// Move paddle on canvas
function movePaddle() {
    paddle.x += paddle.dx;

    // Wall detection
    if (paddle.x + paddle.w > canvas.width) {
        paddle.x = canvas.width - paddle.w;
    }

    if (paddle.x < 0) {
        paddle.x = 0;
    }
}

// Move ball on canvas
function moveBall() {
    ball.x += ball.dx;
    ball.y += ball.dy;

    // Wall detection (x axis right/left)
    if (ball.x + ball.size > canvas.width || ball.x - ball.size < 0) {
        ball.dx *= -1;  // ball.dx = ball.dx * -1; reverses ball direction
    }

    // Wall detection (y axis top/bottom)
    if (ball.y + ball.size > canvas.height || ball.y - ball.size < 0) {
        ball.dy *= -1;
    }

    // Paddle detection
    if (ball.x - ball.size > paddle.x &&
        ball.x + ball.size < paddle.x + paddle.w &&
        ball.y + ball.size > paddle.y
    ) {
        ball.dy *= -1;
    }

    // Brick collision
    bricks.forEach(column => {
        column.forEach(brick => {
            if (brick.visible) {
                if (ball.x - ball.size > brick.x && // left brick side check
                    ball.x + ball.size < brick.x + brick.w && // right brick side check
                    ball.y + ball.size > brick.y && // top brick side check
                    ball.y - ball.size < brick.y + brick.h // bottom brick side check
                ) {
                    ball.dy *= -1;
                    brick.visible = false;
                }
            }
        })
    })
}

// Draw everything
function draw() {
    // clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    drawBall();
    drawPaddle();
    drawScore();
    drawBricks();
}

// Draw Score
function drawScore() {
    // Reference https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Drawing_text#styling_text
    ctx.font = '20px Arial';

    // Drawings text: fillText(text, x, y [, maxWidth])
    ctx.strokeText(`Score: ${score}`, canvas.width - 100, 30)
}

// Update canvas drawing and animation
function update() {
    movePaddle();
    moveBall();
    // Draw everything
    draw();

    requestAnimationFrame(update);
}

update();

// Keydown event
function keyDown(e) {
    if (e.key === 'ArrowRight' || e.key === 'Right') {
        paddle.dx = paddle.speed;
    } else if (e.key === 'ArrowLeft' || e.key === 'Left') {
        paddle.dx = -paddle.speed;
    }
}

// keyup keyUp
function keyUp(e) {
    if (
        e.key === 'ArrowRight'
        || e.key === 'Right'
        || e.key === 'ArrowLeft'
        || e.key === 'Left'
    ) {
        paddle.dx = 0;
    }
}

// Keyboard event handler
document.addEventListener('keydown', keyDown);
document.addEventListener('keyup', keyUp);

// Rules and close Event listeners
rulesBtn.addEventListener('click', () =>
    rules.classList.add('show'));

closeBtn.addEventListener('click', () =>
    rules.classList.remove('show'));
