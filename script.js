var canvas = document.getElementById('canvas');
canvas.width = (288 >= window.innerWidth) ? window.innerWidth : 288;
canvas.height = (512 >= window.innerHeight) ? window.innerHeight : 512;
var ctx = canvas.getContext('2d');

var bg = new Image();
var bird = new Image();
var fg = new Image();
var pipeNorth = new Image();
var pipeSouth = new Image();

bg.src = "images/bg.png";
bird.src = "images/bird.png";
fg.src = "images/fg.png";
pipeNorth.src = "images/pipeNorth.png";
pipeSouth.src = "images/pipeSouth.png";

var gap = 85;
var constant = pipeNorth.height+gap;

var fly = new Audio();
var scor = new Audio();

fly.src = "sound/fly.mp3";
scor.src = "sound/score.mp3";

var bX = 10;
var bY = 150;

var gravity = 1.5;
var score = 0;

document.addEventListener("mouseup", moveUp);

function moveUp() {
    bY -= 40;
    fly.play();
}

var pipe = [];
pipe[0] = {
    x: canvas.width,
    y: 0
}

function draw() {
    ctx.drawImage(bg, 0, 0);

    for (var i = 0; i < pipe.length; i++) {
        ctx.drawImage(pipeNorth, pipe[i].x, pipe[i].y);
        ctx.drawImage(pipeSouth, pipe[i].x, pipe[i].y+constant);

        pipe[i].x--;

        if (pipe[i].x == canvas.width - 188) {
            pipe.push({
                x : canvas.width,
                y : Math.floor(Math.random() * pipeNorth.height) - pipeNorth.height
            });
        }

        if (bX + bird.width >= pipe[i].x && bX <= pipe[i].x + pipeNorth.width && (bY <= pipe[i].y + pipeNorth.height || bY + bird.height >= pipe[i].y+constant) || bY + bird.height >= canvas.height - fg.height) {
            location.reload();
        }

        if (pipe[i].x == 5) {
            score++;
            scor.play();
        }
    }

    ctx.drawImage(fg, 0, canvas.height - fg.height);

    ctx.drawImage(bird, bX, bY);

    bY += gravity;

    ctx.fillStyle = "#000";
    ctx.font = "20px Verdana";
    ctx.fillText("Score: " + score, 10, canvas.height-20);

    requestAnimationFrame(draw);
}
draw();