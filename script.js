const cvs = document.getElementById("snake");
const ctx = cvs.getContext("2d")
console.log(ctx);
const box = 32
const box2 = 16

// backgroud img
const groud = new Image()
groud.src = "./img/ground.png";

// food image
const foodImg = new Image()
foodImg.src = "./img/food.png"

// load audio files

let dead = new Audio();
let eat = new Audio();
let up = new Audio();
let right = new Audio();
let left = new Audio();
let down = new Audio();

dead.src = "audio/dead.mp3";
eat.src = "audio/eat.mp3";
up.src = "audio/up.mp3";
right.src = "audio/right.mp3";
left.src = "audio/left.mp3";
down.src = "audio/down.mp3";


// create the snake
let snake = []
snake[0] = {
    x: 9 * box,
    y: 10 * box
}


// create the food
let food = {
    x: Math.floor(Math.random() * 17 + 1) * box,
    y: Math.floor(Math.random() * 15 + 3) * box
}

// create the score
let score = 0;
// controle the snake 
let d;


function direction(e) {

    const key = e.keyCode;
    if (key == 37 && d != "Right") {
        d = "Left"
        left.play()
    } else if (key == 38 && d != "Down") {
        d = "Up"
        up.play()

    } else if (key == 39 && d != "Left") {
        d = "Right"
        right.play()

    } else if (key == 40 && d != "Up") {
        d = "Down"
        down.play()

    }
}

// chexk collision

function collision(head, array) {
    for (let i = 0; i < array.length; i++) {
        if (head.x == array[i].x && head.y == array[i].y) {
            return true;
        }
    }
    return false;
}


// draw every thing 
document.addEventListener("keydown", direction)

function draw() {
    ctx.drawImage(groud, 0, 0)
    for (let i = 0; i < snake.length; i++) {
        ctx.fillStyle = (i == 0) ? "green" : "white";
        ctx.fillRect(snake[i].x, snake[i].y, box2, box2)
        ctx.strokeStyle = "red"
        ctx.strokeRect(snake[i].x, snake[i].y, box2, box2)
    }
    ctx.drawImage(foodImg, food.x, food.y);
    ctx.fillStyle = "white";
    ctx.font = "45px changa one"
    ctx.fillText(score, 2 * box, 1.6 * box)


    // old head
    let snackX = snake[0].x;
    let snackY = snake[0].y;
    if (d == "Left") {
        snackX -= box2;

    }
    if (d == "Right") {
        snackX += box2;

    }
    if (d == "Up") {
        snackY -= box2;

    }
    if (d == "Down") {
        snackY += box2;


    }







    // snake eat food
    if (snackX == food.x && snackY == food.y) {

        score++

        food = {
            x: Math.floor(Math.random() * 17 + 1) * box,
            y: Math.floor(Math.random() * 15 + 3) * box
        }

    } else {
        snake.pop()
    }


    // new head

    let newHead = {
        x: snackX,
        y: snackY
    }


    if (snackX < box) {
        newHead = {
            x: box * 17 + box2,
            y: snackY
        }
    }
    if (snackX > (17 * box) + box2) {
        newHead = {
            x: box,
            y: snackY
        }
    }
    if (snackY < 3 * box) {
        newHead = {
            x: snackX,
            y: box * 17 + box2
        }
    }
    if (snackY > (17 * box) + box2) {
        newHead = {
            x: snackX,
            y: box * 3
        }
    }
    if (collision(newHead, snake)) {
        dead.play();
        clearInterval(game);
    }
    snake.unshift(newHead)



}

let game

if (score >= 4) {
    game = setInterval(draw, 50)

} else {
    game = setInterval(draw, 100)

}


