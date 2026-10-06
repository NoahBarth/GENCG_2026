function setup() {
  createCanvas(windowWidth, windowHeight)
  angleMode(DEGREES)
  background(244, 243, 239)
  currentX = windowHeight
  currentY = windowWidth
  line(currentX, currentY, currentX+=20, currentY+=20)
  line(currentX, currentY, currentX-=20, currentY+=5)
  line(currentX, currentY, currentX, currentY-=60)
  line(currentX, currentY, currentX-=35, currentY+=35)
  line(currentX, currentY, currentX+=120, currentY)
  line(currentX, currentY, currentX-=50, currentY+=80)
  line(currentX, currentY, currentX-=90, currentY-=200)
  line(currentX, currentY, currentX+=200, currentY+=80)
  line(currentX, currentY, currentX-=400, currentY+=110)
  line(currentX, currentY, currentX+=80, currentY-=280)
  line(currentX, currentY, currentX+=175, currentY+=210)
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight)
}
