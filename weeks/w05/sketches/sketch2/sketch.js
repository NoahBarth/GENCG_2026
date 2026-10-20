let img;
const sampleStep = 5;

async function setup() {
  createCanvas(640, 480);
  pixelDensity(1);
  colorMode(RGB, 255);
  noLoop();

  try {
    img = await loadImage('images.jpg');
  } catch (error) {
    background(255);
    fill(0);
    text('Could not load images.jpg. Check the file and local server.', 20, 40);
    console.error(error);
    return;
  }

  // Fit a working copy inside 640 x 480 without stretching it.
  const scaleFactor = min(640 / img.width, 480 / img.height, 1);
  img.resize(
    max(1, floor(img.width * scaleFactor)),
    max(1, floor(img.height * scaleFactor))
  );
  resizeCanvas(img.width, img.height);
  drawSamples();

  const c = img.get(floor(img.width / 2), floor(img.height / 2));
  console.log('Centre sample [red, green, blue, alpha]:', c);
}

function drawSamples() {
  background(255);
  noStroke();

  for (let y = 0; y < img.height; y += sampleStep) {
    for (let x = 0; x < img.width; x += sampleStep) {
      const cellWidth = min(sampleStep, img.width - x);
      const cellHeight = min(sampleStep, img.height - y);
      const c = img.get(x, y);

      // fill(c[0], c[1], c[2]);
      // rect(x, y, cellWidth, cellHeight);
      const tone = (c[0] + c[1] + c[2]) / 3;
      const diameter = map(tone, 0, 255, min(cellWidth, cellHeight), 0);
      fill(0);
      circle(x + cellWidth / 2, y + cellHeight / 2, diameter)
    }
  }
}