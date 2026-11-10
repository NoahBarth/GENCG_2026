const ITERATIONS = 7;
const BRANCHES = 3;
const TRUNK_LENGTH = 180;
const LENGTH_FACTOR = 0.72;
const SPREAD_ANGLE = 32;
const JITTER = 0.25;         
const TRUNK_WEIGHT = 10;     


let segmentsByDepth = [];   
let rotating = true;
let rotY = 0;

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  angleMode(DEGREES);
  buildTree();
}

function buildTree() {
  segmentsByDepth = Array.from({ length: ITERATIONS + 1 }, () => []);
  const base = createVector(0, 0, 0);
  const up = createVector(0, -1, 0);
  grow(base, up, TRUNK_LENGTH, 0, random(360));
}

function grow(start, dir, len, depth, twist) {
  const end = p5.Vector.add(start, p5.Vector.mult(dir, len));
  segmentsByDepth[depth].push({ a: start, b: end });

  if (depth >= ITERATIONS) return;

  const [u, v] = perpendicularBasis(dir);

  for (let i = 0; i < BRANCHES; i++) {
    const phi = twist + (360 / BRANCHES) * i + random(-1, 1) * JITTER * 40;
    const tilt = SPREAD_ANGLE * (1 + random(-1, 1) * JITTER);

    const side = p5.Vector.add(
      p5.Vector.mult(u, cos(phi)),
      p5.Vector.mult(v, sin(phi))
    );
    const childDir = p5.Vector.add(
      p5.Vector.mult(dir, cos(tilt)),
      p5.Vector.mult(side, sin(tilt))
    ).normalize();

    const childLen = len * LENGTH_FACTOR * (1 + random(-1, 1) * JITTER * 0.3);
    grow(end, childDir, childLen, depth + 1, twist + 137.5);
  }
}

function perpendicularBasis(dir) {
  const helper = abs(dir.y) < 0.9 ? createVector(0, 1, 0) : createVector(1, 0, 0);
  const u = p5.Vector.cross(dir, helper).normalize();
  const v = p5.Vector.cross(dir, u).normalize();
  return [u, v];
}

function draw() {
  background(11, 13, 18);
  orbitControl(2, 2, 0.1);

  if (rotating) rotY += 0.25;
  translate(0, height * 0.32, 0);
  rotateY(rotY);

  // ground disc
  push();
  rotateX(90);
  noStroke();
  fill(25, 30, 40);
  circle(0, 0, 500);
  pop();

  for (let d = 0; d <= ITERATIONS; d++) {
    const t = d / ITERATIONS;
    const c = lerpColor(color(110, 75, 45), color(140, 230, 160), t);
    stroke(c);
    strokeWeight(max(1, TRUNK_WEIGHT * pow(0.65, d)));
    beginShape(LINES);
    for (const s of segmentsByDepth[d]) {
      vertex(s.a.x, s.a.y, s.a.z);
      vertex(s.b.x, s.b.y, s.b.z);
    }
    endShape();
  }
}

function keyPressed() {
  if (key === 'r' || key === 'R') buildTree();
  if (key === ' ') rotating = !rotating;
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
