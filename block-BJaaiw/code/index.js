let canvas = document.querySelector(".myCanvas")
let ctx = canvas.getContext("2d")
canvas.width = 1000;
canvas.height = 600;

let x = canvas.width/2;
let y = canvas.height - 80;
let radius = 12;
let dx = 2;
let dy = -2;
let paddleWidth = 100;
let paddleHeight = 10;
let paddleX = (canvas.width - paddleWidth)/2

let rightPressed = false;
let leftPressed = false;

const brickRowCount = 5;
const brickColumnCount = 10;
const brickWidth = 75;
const brickHeight = 20;
const brickPadding = 10;
const brickOffsetTop = 30;
const brickOffsetLeft = 60;

let score = 0;
let lives = 3;


document.addEventListener("keydown", keyDownHandler, false)
document.addEventListener("keyup", keyUpHandler,false)
document.addEventListener("mousemove", mouseMoveHandler, false);

function mouseMoveHandler(e) {
const relativeX = e.clientX - canvas.offsetLeft;
if (relativeX > 0 && relativeX < canvas.width) {
    paddleX = relativeX - paddleWidth / 2;
    }
}

const bricks = [];
for (let c = 0; c < brickColumnCount; c++) {
bricks[c] = [];
for (let r = 0; r < brickRowCount; r++) {
    bricks[c][r] = { x: 0, y: 0, status: 1 };
    }
}

function drawPaddle(){
    ctx.beginPath();
    ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
    ctx.fillStyle = "black";
    ctx.fill();
    ctx.closePath();
}

function drawBall() {
ctx.beginPath();
ctx.arc(x, y, radius, 0, Math.PI*2, false);
ctx.fillStyle = "blue";
ctx.fill();
ctx.closePath();
}

function drawBricks() {
for (let c = 0; c < brickColumnCount; c++) {
    for (let r = 0; r < brickRowCount; r++) {
        if(bricks[c][r].status == 1){
            const brickX = c * (brickWidth + brickPadding) + brickOffsetLeft;
            const brickY = r * (brickHeight + brickPadding) + brickOffsetTop;
            bricks[c][r].x = brickX;
            bricks[c][r].y = brickY;
            ctx.beginPath();
            ctx.rect(brickX, brickY, brickWidth, brickHeight);
            ctx.fillStyle = "#0095DD";
            ctx.fill();
            ctx.closePath();
        }
    }
}
}

function drawScore(){
    ctx.font = "16px Ariel";
    ctx.fillStyle = "Black";
    ctx.fillText(`score:${score}`, 8 , 20)
}

function drawLives() {
    ctx.font = "16px Arial";
    ctx.fillStyle = "#0095DD";
    ctx.fillText(`Lives: ${lives}`, canvas.width - 65, 20);
}


function collisionDetection() {
for (let c = 0; c < brickColumnCount; c++) {
    for (let r = 0; r < brickRowCount; r++) {
        const b = bricks[c][r];
        if(b.status == 1){
            if (x > b.x && x < b.x + brickWidth && y > b.y && y < b.y + brickHeight) {
                dy = -dy;
                b.status = 0;
                score++;
                if (score === brickRowCount * brickColumnCount) {
                    alert("YOU WIN, CONGRATULATIONS!");
                    document.location.reload();
                }
            }
        }
    }
}
}


function keyDownHandler(e){
    if(e.key === "Right" || e.key === "ArrowRight"){
        rightPressed = true;
    }
    else if(e.key === "Left" || e.key === "ArrowLeft"){
        leftPressed = true;
    }
}

function keyUpHandler(e){
    if(e.key === "Right" || e.key === "ArrowRight"){
        rightPressed = false;
    }
    else if(e.key === "Left" || e.key === "ArrowLeft"){
        leftPressed = false;
    }
}


function draw() {
ctx.clearRect(0 , 0, canvas.width, canvas.height);
drawBall();
drawPaddle();
drawBricks();
drawScore();
drawLives()
collisionDetection();

x += dx;
y += dy;


if(x + dx > canvas.width - radius|| x + dx < radius){
    dx = -dx ;
}
if(y + dy < radius){
    dy = -dy;
}
else if(y + dy > canvas.height - radius){
    if(x > paddleX && x < paddleWidth + paddleX){
        dy = -dy
    }
    else{
        lives--;
        if (!lives) {
            alert("GAME OVER");
            document.location.reload();
        }else {
            x = canvas.width / 2;
            y = canvas.height - 30;
            dx = 2;
            dy = -2;
            paddleX = (canvas.width - paddleWidth) / 2;
        }
    }
}

if(rightPressed){
    paddleX = Math.min(paddleX + 5, canvas.width - paddleWidth);
}
else if(leftPressed){
    paddleX = Math.max(paddleX - 5, 0)
}
requestAnimationFrame(draw)
}



function startGame() {
    draw();
}


document.querySelector(".runButton").addEventListener("click", function () {
startGame();
this.disabled = true;
});




