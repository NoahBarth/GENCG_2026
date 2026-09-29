---
title: Instructions & Systems
date: 2026-09-14
week: 1
tags:
  - instructions
  - systems
  - journal
publish: true
---

- [Lesson 01: Instructions & Systems](https://digitalideation.github.io/gencg_h2601/lessons/lesson01_intro/)
- [Journal guidelines](https://github.com/digitalideation/gencg_h2601/blob/refactor_2026/lessons/extra/journal.md)

## Evidence checklist

Keep evidence of the process, not only the successful result.
This is added to check functionality of GitHub

- [x] Original drawing or idea
- [x] First instruction set
- [x] First execution by another person
- [x] Moments of confusion or ambiguity
- [ ] Revised instructions
- [ ] Second execution
- [ ] Sketch or diagram of the system
- [ ] p5.js translation

<!-- Add images to ./sketches/ and embed them like this:
![[./sketches/your-file-name.jpg]]
-->

## 1. Exploration & Experimentation

### Human → Human

**Original idea**

![[Pasted image 20260922153254.png|425]]

**First instruction set**

1. Create a point in the Center of the Paper.
2. Draw a second and third dot on the paper and connect those to create a somewhat even triangle.
3. Extend the last line through the center and increase the distance.
4. Add two more points, connect them and run the last line through the center again, with increased distance.
5. Rinse and repeat.

**First executions**

![[Pasted image 20260922153446.png|380]]
Sketch created by Daniel Barot

![[Pasted image 20260922154516.png|379]]
Sketch created by Felix Steiner

**Where did interpretation differ?**

- The dots which were drawn on different spots or not at all
- The lines were not allways linear and had different goals

**Conclusion**
The instructions were to unclear to properly replicate the original Idea. Some parts may still be recognizable from the Original design.

### Human → Computer

![[./sketches/01-test/index.html]]

What did a human understand automatically that the computer needed you to specify?

- simple forms
- continuous instructions
-

```js
// Add your own p5.js translation here.
createCanvas(windowWidth, windowHeight);

angleMode(DEGREES);

background(244, 243, 239);

currentX = windowHeight / 2;

currentY = windowWidth / 2;

line(currentX, currentY, (currentX += 20), (currentY += 20));

line(currentX, currentY, (currentX -= 20), (currentY += 5));

line(currentX, currentY, currentX, (currentY -= 60));

line(currentX, currentY, (currentX -= 35), (currentY += 35));

line(currentX, currentY, (currentX += 120), currentY);

line(currentX, currentY, (currentX -= 50), (currentY += 80));

line(currentX, currentY, (currentX -= 90), (currentY -= 200));

line(currentX, currentY, (currentX += 200), (currentY += 80));

line(currentX, currentY, (currentX -= 400), (currentY += 110));

line(currentX, currentY, (currentX += 80), (currentY -= 280));

line(currentX, currentY, (currentX += 175), (currentY += 210));
```

**Parameters tested**

| Parameter | Values tried | What changed |
| --------- | ------------ | ------------ |
|           |              |              |
|           |              |              |

**Technical challenges or failed attempts**

-
-

## 2. Influences & References

Choose at least one work, artist, or idea from the lesson or your own research.

- **Artist / work:**
- **Link or citation:**
- **What I noticed:**
- **How it connects to my experiment:**

Possible starting points from the lesson include Sol LeWitt, Conditional Design, George Brecht, Alison Knowles, and Yoko Ono.

## 3. Algorithmic Thinking

**What stays fixed?**

-

**What can vary?**

-

**Describe the system in plain language or pseudocode**

```text
START

ADD YOUR RULES HERE

STOP WHEN ...
```

**How do the rules produce the visual result?**

<!-- Explain the relationship between your instructions and the outcome. -->

## 4. Critical Reflection

- One thing my executor interpreted differently was...
- One rule I changed was...
- One ambiguity I decided to keep was...
- One thing I had to make explicit for the computer was...
- What worked or surprised me?
- What did not work, and why?
- What would I explore next?

## Next steps

- [ ] Save all drawings and outputs
- [ ] Check that images and links work
- [ ] Choose one question to carry into Week 2
