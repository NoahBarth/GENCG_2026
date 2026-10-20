let img;
const sampleStep = 2;

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
  stroke(0);
  strokeWeight(1);

  for (let y = 0; y < img.height; y += sampleStep) {
    for (let x = 0; x < img.width; x += sampleStep) {
      const c = img.get(x, y);

      // Calculate pixel brightness
      const tone = (c[0] + c[1] + c[2]) / 3;

      // Darker pixels produce longer lines
      const lineLength = map(tone, 0, 255, sampleStep, 0);

      // Draw a horizontal line centred in each cell
      const centerX = x + sampleStep / 2;
      const centerY = y + sampleStep / 2;

      line(
        centerX - lineLength / 2,
        centerY,
        centerX + lineLength / 2,
        centerY
      );
    }
  }
}
