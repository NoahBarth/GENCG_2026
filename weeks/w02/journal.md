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

## Week 2

In this week i tried to add Motion to the Sketches i create. The Goal was to introduce changes overtime to the canvas, which signify the passing of time in the real world.

### Human Concepts

![[Pasted image 20261006174055.png]]
As an first draft was the idea to morph and change lines. Those Changes should oscillate back and forth to morph the structure i created. The base idea was given to me by daniel barot, who created a similar end-product based on our talks.

### Human → Computer

![[./sketches/index.html]]

As an Initial Design i tried to create lines which generate waves over time. This didn't seem to quite work out as intended, but still made for an interesting Piece, with waves of lines slowly going up and down the screen. It looked almost like the tides on a beach, going up and down the sands

Here the final code which led to the implementation above

```js
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
      let wave = sin(x * 0.01 + frameCount * 0.03 + i * 5) * 200;

      let y = baseY + wave;

      vertex(x, y);
    }

    endShape();
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
```

## Reflection

While i was happy with the final result i may could iterated more over it, create different versions and increase the complexity for more interesting results. It also took me a bit longer than expected, which is probably a result of rusty p5.js skills. I'm still happy with the final result and would like to create more pieces in this direction...
