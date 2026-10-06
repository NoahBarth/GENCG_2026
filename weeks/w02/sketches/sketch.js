let lineCount = 30;

function setup() {
  createCanvas(windowWidth, windowHeight);
  angleMode(DEGREES);
}

function draw() {
  background(220);

  noFill();
  stroke(0);
  strokeWeight(2);

  for (let i = 0; i < lineCount; i++) {
    let baseY = i * 30;
    beginShape();
    for (let x = 0; x <= width; x += 5) {

      let wave = sin(
        x * 0.01 +
        frameCount * 0.03 +
        i * 5
      ) * 200;

      let y = baseY + wave;

      vertex(x, y);
    }

    endShape();
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}