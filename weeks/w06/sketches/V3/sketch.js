const SIZE = 260;               
const LAYERS = 36;              
const POINTS_PER_LAYER = 44;    
const FACE_POINTS = 140;      
const NEIGHBOURS = 2;           
const LINK_CHANCE = 0.85;    
const RING_CHANCE = 0.7;     
const ROUGHNESS = 6;         
const SEGMENTS_PER_FRAME = 8;   

let segments = [];
let progress = 0;
let rotating = true;
let rotY = 30;
const H = SIZE / 2;

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  angleMode(DEGREES);
  build();
}

function outlinePoint(t, y) {
  const side = floor(t) % 4;
  const f = t - floor(t);
  const off = random(-ROUGHNESS, ROUGHNESS);
  const s = -H + f * SIZE;
  switch (side) {
    case 0: return createVector(s, y, -H - off);   // back
    case 1: return createVector(H + off, y, s);    // right
    case 2: return createVector(-s, y, H + off);   // front
    default: return createVector(-H - off, y, -s); // left
  }
}

function makeRing(y) {
  const ts = [0, 1, 2, 3];
  const n = POINTS_PER_LAYER - 4;
  for (let i = 0; i < n; i++) ts.push(((i + random()) / n) * 4);
  ts.sort((a, b) => a - b);
  return ts.map((t) => outlinePoint(t, y + random(-ROUGHNESS, ROUGHNESS) * 0.5));
}

function nearest(p, pts, count) {
  return pts
    .map((q) => ({ q, d: p5.Vector.dist(p, q) }))
    .sort((a, b) => a.d - b.d)
    .slice(0, count)
    .map((o) => o.q);
}

function faceWeb(ring, y) {
  const pts = [...ring];
  for (let i = 0; i < FACE_POINTS; i++) {
    pts.push(createVector(
      random(-H, H),
      y + random(-ROUGHNESS, ROUGHNESS) * 0.5,
      random(-H, H)
    ));
  }
  const seen = new Set();
  const segs = [];
  pts.forEach((p, i) => {
    for (const q of nearest(p, pts, 4).slice(1)) {
      const j = pts.indexOf(q);
      const key = i < j ? i + '-' + j : j + '-' + i;
      if (seen.has(key) || random() > LINK_CHANCE) continue;
      seen.add(key);
      segs.push({ a: p, b: q });
    }
  });
  segs.sort((s1, s2) => (s1.a.x + s1.b.x) - (s2.a.x + s2.b.x));
  return segs;
}

function build() {
  segments = [];
  progress = 0;

  const ringStep = SIZE / LAYERS;
  let below = null;

  for (let l = 0; l <= LAYERS; l++) {
    const y = -l * ringStep;
    const ring = makeRing(y);

    if (l === 0) segments.push(...faceWeb(ring, y));

    if (below) {
      for (const p of ring) {
        for (const q of nearest(p, below, NEIGHBOURS)) {
          if (random() < LINK_CHANCE) segments.push({ a: q, b: p });
        }
      }
    }

    for (let k = 0; k < ring.length; k++) {
      if (random() < RING_CHANCE) {
        segments.push({ a: ring[k], b: ring[(k + 1) % ring.length] });
      }
    }

    if (l === LAYERS) segments.push(...faceWeb(ring, y)); // top face
    below = ring;
  }
}

function draw() {
  background(10);
  orbitControl(2, 2, 0.1);

  if (rotating) rotY += 0.3;
  rotateX(-20);
  translate(0, H, 0);
  rotateY(rotY);

  push();
  rotateX(90);
  noFill();
  stroke(55);
  strokeWeight(1);
  rectMode(CENTER);
  square(0, 0, SIZE * 1.6);
  pop();

  progress = min(progress + SEGMENTS_PER_FRAME, segments.length);
  const done = floor(progress);

  stroke(230);
  strokeWeight(1);
  beginShape(LINES);
  for (let i = 0; i < done; i++) {
    const s = segments[i];
    vertex(s.a.x, s.a.y, s.a.z);
    vertex(s.b.x, s.b.y, s.b.z);
  }
  endShape();

  if (done < segments.length) {
    const s = segments[done];
    const tip = p5.Vector.lerp(s.a, s.b, progress - done);

    stroke(255);
    strokeWeight(2);
    line(s.a.x, s.a.y, s.a.z, tip.x, tip.y, tip.z);

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

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}