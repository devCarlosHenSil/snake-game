const canvas = document.getElementById("game-canvas");
const ctx = canvas.getContext("2d");

const box = 20;
const canvasSize = 20;

let snake = [{ x: 9, y: 9 }];
let food = randomFood();
let direction = { x: 1, y: 0 };
let nextDirection = { x: 1, y: 0 };
let score = 0;
let gameOver = false;

document.addEventListener("keydown", handleKey);

function handleKey(event) {
  switch (event.key) {
    case "ArrowUp":
      if (direction.y === 0) nextDirection = { x: 0, y: -1 };
      break;
    case "ArrowDown":
      if (direction.y === 0) nextDirection = { x: 0, y: 1 };
      break;
    case "ArrowLeft":
      if (direction.x === 0) nextDirection = { x: -1, y: 0 };
      break;
    case "ArrowRight":
      if (direction.x === 0) nextDirection = { x: 1, y: 0 };
      break;
  }
}

function randomFood() {
  return {
    x: Math.floor(Math.random() * canvasSize),
    y: Math.floor(Math.random() * canvasSize),
  };
}

function collision(head) {
  return (
    head.x < 0 ||
    head.x >= canvasSize ||
    head.y < 0 ||
    head.y >= canvasSize ||
    snake.some((segment) => segment.x === head.x && segment.y === head.y)
  );
}

function draw() {
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  snake.forEach((segment) => {
    ctx.fillStyle = "lime";
    ctx.fillRect(segment.x * box, segment.y * box, box, box);
  });

  ctx.fillStyle = "red";
  ctx.fillRect(food.x * box, food.y * box, box, box);
}

function update() {
  if (gameOver) return;

  direction = nextDirection;

  const head = {
    x: snake[0].x + direction.x,
    y: snake[0].y + direction.y,
  };

  if (collision(head)) {
    gameOver = true;
    document.getElementById("game-over").classList.remove("hidden");
    return;
  }

  snake.unshift(head);

  if (head.x === food.x && head.y === food.y) {
    score++;
    document.querySelector("#score span").textContent = score;
    food = randomFood();
  } else {
    snake.pop();
  }

  draw();
}

setInterval(update, 200);
