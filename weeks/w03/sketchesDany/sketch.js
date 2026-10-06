let canvasHeight = 400;
let canvasWidth = 400;
let posX = canvasWidth;
let posY = canvasHeight;
let rotation = 30;
let count = 40

function setup() {
  createCanvas(canvasWidth, canvasHeight);
  angleMode(DEGREES);
  forward(200);
  for (let i = 0; i < count; i++) {
    forward(400);
  }
}

function forward(forward) {
  line(posX, posY, forward * cos(rotation), forward * sin(rotation));
  posX = forward * cos(rotation);
  posY = forward * sin(rotation);
}

function draw() {
}