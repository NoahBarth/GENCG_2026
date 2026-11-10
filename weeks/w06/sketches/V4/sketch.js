const SIZE = 260;               
const LAYERS = 30;              
const OUTLINE_POINTS = 40;      
const INTERIOR_POINTS = 45;     
const UP_LINKS = 2;             
const SIDE_LINKS = 3;         
const LINK_CHANCE = 0.8;        
const ROUGHNESS = 6;            

const LAYER_DELAY = 10;     
const GROW_TIME = 40;       
const STAGGER = 25;         

let layers = [];  
let time = 0;
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
  const s = -H + (t - floor(t)) * SIZE;
  const off = random(-ROUGHNESS, ROUGHNESS);
  switch (side) {
    case 0: return createVector(s, y, -H - off);
    case 1: return createVector(H + off, y, s);
    case 2: return createVector(-s, y, H + off);
    default: return createVector(-H - off, y, -s);
  }
}

function makeLayerPoints(y) {
  const jitterY = () => y + random(-ROUGHNESS, ROUGHNESS) * 0.5;
  const outline = [0, 1, 2, 3];
  const n = OUTLINE_POINTS - 4;
  for (let i = 0; i < n; i++) outline.push(((i + random()) / n) * 4);
  outline.sort((a, b) => a - b);
  const ring = outline.map((t) => outlinePoint(t, jitterY()));

  const inner = [];
  for (let i = 0; i < INTERIOR_POINTS; i++) {
    const m = H - ROUGHNESS;
    inner.push(createVector(random(-m, m), jitterY(), random(-m, m)));
  }
  return { ring, all: [...ring, ...inner] };
}

function nearest(p, pts, count, skipSelf) {
  return pts
    .filter((q) => !(skipSelf && q === p))
    .map((q) => ({ q, d: p5.Vector.dist(p, q) }))
    .sort((a, b) => a.d - b.d)
    .slice(0, count)
    .map((o) => o.q);
}

function build() {
  for (const L of layers) if (L.geom) freeGeometry(L.geom);
  layers = [];
  time = 0;

  const step = SIZE / LAYERS;
  let below = null;

  for (let l = 0; l <= LAYERS; l++) {
    const { ring, all } = makeLayerPoints(-l * step);
    const t0 = l * LAYER_DELAY;
    const segs = [];
    const add = (a, b, delay) => {
      if (random() < LINK_CHANCE) {
        segs.push({ a, b, start: t0 + delay + random(STAGGER) });
      }
    };

    if (below) {
      for (const p of all) {
        for (const q of nearest(p, below, UP_LINKS)) add(q, p, 0);
      }
    }

    const seen = new Set();
    for (const p of all) {
      for (const q of nearest(p, all, SIDE_LINKS, true)) {
        const i = all.indexOf(p), j = all.indexOf(q);
        const key = min(i, j) + '-' + max(i, j);
        if (seen.has(key)) continue;
        seen.add(key);
        add(p, q, GROW_TIME * 0.5);
      }
    }

    for (let k = 0; k < ring.length; k++) {
      add(ring[k], ring[(k + 1) % ring.length], GROW_TIME * 0.5);
    }

    const end = max(segs.map((s) => s.start)) + GROW_TIME;
    layers.push({ segs, end, geom: null });
    below = all;
  }
}

function drawSegs(segs) {
  noFill();
  beginShape(LINES);
  for (const s of segs) {
    vertex(s.a.x, s.a.y, s.a.z);
    vertex(s.b.x, s.b.y, s.b.z);
  }
  endShape();
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

  time++;
  noFill();
  stroke(230);
  strokeWeight(1);

  for (const L of layers) {
    if (time < L.segs[0]?.start - STAGGER) break;

    if (time >= L.end) {
      if (!L.geom) L.geom = buildGeometry(() => drawSegs(L.segs));
      model(L.geom);
      continue;
    }

    beginShape(LINES);
    for (const s of L.segs) {
      const f = constrain((time - s.start) / GROW_TIME, 0, 1);
      if (f <= 0) continue;
      const e = 1 - pow(1 - f, 2);
      vertex(s.a.x, s.a.y, s.a.z);
      vertex(
        lerp(s.a.x, s.b.x, e),
        lerp(s.a.y, s.b.y, e),
        lerp(s.a.z, s.b.z, e)
      );
    }
    endShape();
  }
}


function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
