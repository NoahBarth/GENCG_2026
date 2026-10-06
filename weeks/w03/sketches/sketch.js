var maxCount = 800;
var currentCount = 1;
var x = [];
var y = [];
var r = [];

function setup() {
  createCanvas(800, 800);
  strokeWeight(0.5);

  // first circle
  x[0] = width / 3;
  y[0] = height / 2;
  r[0] = 20;
}

function draw() {
  clear();

  // create a random set of parameters
  var newR = random(2, 10);
  var newX = random(newR, width - newR);
  var newY = random(newR, height - newR);

  var closestDist = Number.MAX_VALUE;
  var closestIndex = 0;
  for (var i = 0; i < currentCount; i++) {
    var newDist = dist(newX, newY, x[i], y[i]);
    if (newDist < closestDist) {
      closestDist = newDist;
      closestIndex = i;
    }
  }

  // aline it to the closest circle outline
  var angle = atan2(newY - y[closestIndex], newX - x[closestIndex]);

  x[currentCount] = x[closestIndex] + cos(angle) * (r[closestIndex] + newR);
  y[currentCount] = y[closestIndex] + sin(angle) * (r[closestIndex] + newR);
  r[currentCount] = newR;
  currentCount++;

  for (var i = 0; i < currentCount; i++) {
    fill(50);
    line(x[i], y[i], r[i] * 2, r[i] * 100);
  }

  if (currentCount >= maxCount) noLoop();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}