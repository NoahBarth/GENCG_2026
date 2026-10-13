---
title: Experiment 02
date: 2026-09-14
week: 1
tags:
  - image
  - prompting
  - experiment
publish: true
---

## Week 3

In this week i created a "beautiful Corpse" in collaboration with Daniel Barot.

### Beautiufl Corpse V1

Due do time constraints we based our initial Corpse on an already existing Agent. in the 10 minutes given to us, i adjusted values inside the Agent and tweaked minor functions to limit the range of the created artwork. after that i passed the resulting script of to Daniel.
![[weeks/w03/sketches/sketch1/BeautifulCorpse.html]]

The Agent created a dot-based tree with varying sizes. Bellow the code which led to this first version.

```js
"use strict";

var maxCount = 400;

var currentCount = 1;

var x = [];

var y = [];

var r = [];

function setup() {
  createCanvas(800, 800);

  strokeWeight(0.5); // first circle

  x[0] = width / 2;

  y[0] = height / 2;

  r[0] = 10;
}

function draw() {
  clear(); // create a random set of parameters

  var newR = random(1, 5);

  var newX = random(newR, width - newR);

  var newY = random(newR, height - newR);

  var closestDist = Number.MAX_VALUE;

  var closestIndex = 0; // which circle is the closest?

  for (var i = 0; i < currentCount; i++) {
    var newDist = dist(newX, newY, x[i], y[i]);

    if (newDist < closestDist) {
      closestDist = newDist;

      closestIndex = i;
    }
  } // aline it to the closest circle outline

  var angle = atan2(newY - y[closestIndex], newX - x[closestIndex]);

  x[currentCount] = x[closestIndex] + cos(angle) * (r[closestIndex] + newR);

  y[currentCount] = y[closestIndex] + sin(angle) * (r[closestIndex] + newR);

  r[currentCount] = newR;

  currentCount++;

  for (var i = 0; i < currentCount; i++) {
    fill(50);

    ellipse(x[i], y[i], r[i] * 2, r[i] * 2);
  }

  if (currentCount >= maxCount) noLoop();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
```

### Beautiufl Corpse V2

Daniel Barot adjusted the agent further, even simplifying him more. He removed the dots and made the lines which calculate the dot-position visible. This led to a fan-like pattern, starting out at the top left and spanning through the whole canvas.

![[weeks/w03/sketches/sketch2/BeautifulCorpse.html]]

the line ends show the places where a dot would have been drawn. Below the code which made this pattern happen.

```js
"use strict";

var maxCount = 400;

var currentCount = 1;

var x = [];

var y = [];

var r = [];

function setup() {
  createCanvas(800, 800);

  strokeWeight(0.5); // first circle

  x[0] = width / 3;

  y[0] = height / 2;

  r[0] = 20;
}

function draw() {
  clear(); // create a random set of parameters

  var newR = random(2, 7);

  var newX = random(newR, width - newR);

  var newY = random(newR, height - newR);

  var closestDist = Number.MAX_VALUE;

  var closestIndex = 0; // which circle is the closest?

  for (var i = 0; i < currentCount; i++) {
    var newDist = dist(newX, newY, x[i], y[i]);

    if (newDist < closestDist) {
      closestDist = newDist;

      closestIndex = i;
    }
  } // aline it to the closest circle outline

  var angle = atan2(newY - y[closestIndex], newX - x[closestIndex]);

  x[currentCount] = x[closestIndex] + cos(angle) * (r[closestIndex] + newR);

  y[currentCount] = y[closestIndex] + sin(angle) * (r[closestIndex] + newR);

  r[currentCount] = newR;

  currentCount++;

  for (var i = 0; i < currentCount; i++) {
    fill(50);

    line(x[i], y[i], r[i] * 2, r[i] * 2);
  }

  if (currentCount >= maxCount) noLoop();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
```

## Beautiufl Corpse V2

For the final version the ball was back in my court. This time i tried to add more randomness to the whole pattern by adjusting coordinates for a more wild look. While it may seem unstructured on the first glance, it does show a pattern when run long enough. would the code still contain the dots, there probably would still be some kind of tree pattern drawn on the canvas

![[weeks/w03/sketches/sketch3/BeautifulCorpse.html]]

Below the code which contains the further adjustments to the drawn lines.

```js
var maxCount = 800;

var currentCount = 1;

var x = [];

var y = [];

var r = [];

function setup() {
  createCanvas(800, 800);

  strokeWeight(0.5); // first circle

  x[0] = width / 3;

  y[0] = height / 2;

  r[0] = 20;
}

function draw() {
  clear(); // create a random set of parameters

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
  } // aline it to the closest circle outline

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
```

## Reflection

While the resulting corpse was quite fun to watch, the creation process was limited by time constraints and thus not entirely our own creation. Still it showed how much would be actually possible with enough time. Certain input by AI was helpful, but to be enjoyed with some caution. While it reduces crunch time, it often interprets wrongly if given unclear instructions
