function setup() {
  createCanvas(windowWidth, windowHeight)
}

function draw() {
  background(244, 243, 239)
  noStroke()
  fill(72, 94, 108)
  const x = mouseX >= 0 && mouseX <= width ? mouseX : width / 2
  const y = mouseY >= 0 && mouseY <= height ? mouseY : height / 2
  circle(x, y, 48)
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight)
}
