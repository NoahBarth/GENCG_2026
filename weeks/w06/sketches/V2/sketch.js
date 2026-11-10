const LAYERS = 60;              // fixed number of iterations (layers)
const NODES_PER_RING = 24;      // net resolution around the pole
const LAYER_HEIGHT = 8;         // vertical distance between layers
const RADIUS = 70;              // base radius of the pole
const WOBBLE = 0.12;            // 0 = perfect cylinder, higher = more organic
const SHOW_RINGS = true;        // horizontal lines in every layer
const SEGMENTS_PER_FRAME = 6;   // print speed

// ---- State ------------------------------------------------------------
let segments = [];   // ordered print path: [{a, b}, ...]
let progress = 0;    // how many segments have been printed (can be fractional)
let rotating = true;
let rotY = 0;
let seed = 0;

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  angleMode(DEGREES);
  build();
}

function build() {
  seed = random(10000);
  noiseSeed(seed);
  segments = [];
  progress = 0;

  // 1) Generate the nodes of each layer.
  //    Every second layer is rotated by half a step -> diamond net.
  const step = 360 / NODES_PER_RING;
  const nodes = [];
  for (let l = 0; l <= LAYERS; l++) {
    const ring = [];
    for (let k = 0; k < NODES_PER_RING; k++) {
      const ang = (k + 0.5 * (l % 2)) * step;
      const n = noise(cos(ang) + 1, sin(ang) + 1, l * 0.08); // smooth 3D noise
      const r = RADIUS * (1 + (n - 0.5) * 2 * WOBBLE);
      ring.push(createVector(r * cos(ang), -l * LAYER_HEIGHT, r * sin(ang)));
    }
    nodes.push(ring);
  }

  // 2) Build the print path, one layer at a time.
  for (let l = 0; l <= LAYERS; l++) {
    // diagonals rising from the layer below into this layer
    if (l > 0) {
      const below = nodes[l - 1];
      const here = nodes[l];
      // shifted layer below -> neighbours above are k and k+1, else k-1 and k
      const belowShifted = (l - 1) % 2 === 1;
      for (let k = 0; k < NODES_PER_RING; k++) {
        const k2 = belowShifted ? (k + 1) % NODES_PER_RING
                                : (k - 1 + NODES_PER_RING) % NODES_PER_RING;
        segments.push({ a: below[k], b: here[k] });
        segments.push({ a: below[k], b: here[k2] });
      }
    }
    // perimeter of this layer
    if (SHOW_RINGS) {
      const ring = nodes[l];
      for (let k = 0; k < NODES_PER_RING; k++) {
        segments.push({ a: ring[k], b: ring[(k + 1) % NODES_PER_RING] });
      }
    }
  }
}

function draw() {
  background(10);
  orbitControl(2, 2, 0.1);

  if (rotating) rotY += 0.3;
  translate(0, (LAYERS * LAYER_HEIGHT) / 2, 0); // center the pole vertically
  rotateY(rotY);

  // build plate
  push();
  rotateX(90);
  noFill();
  stroke(60);
  strokeWeight(1);
  circle(0, 0, RADIUS * 3.2);
  pop();

  // advance the print
  progress = min(progress + SEGMENTS_PER_FRAME, segments.length);
  const done = floor(progress);

  // printed segments
  stroke(235);
  strokeWeight(1.2);
  beginShape(LINES);
  for (let i = 0; i < done; i++) {
    const s = segments[i];
    vertex(s.a.x, s.a.y, s.a.z);
    vertex(s.b.x, s.b.y, s.b.z);
  }
  endShape();

  // segment currently being printed + print head
  if (done < segments.length) {
    const s = segments[done];
    const t = progress - done;
    const tip = p5.Vector.lerp(s.a, s.b, t);

    stroke(255);
    strokeWeight(2);
    line(s.a.x, s.a.y, s.a.z, tip.x, tip.y, tip.z);

    // nozzle
    push();
    translate(tip.x, tip.y, tip.z);
    stroke(150);
    strokeWeight(1);
    line(0, 0, 0, 0, -40, 0);
    noStroke();
    fill(255);
    sphere(2.5);
    translate(0, -48, 0);
    fill(120);
    box(14, 16, 14);
    pop();
  }
}

function keyPressed() {
  if (key === 'r' || key === 'R') build();
  if (key === ' ') rotating = !rotating;
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}