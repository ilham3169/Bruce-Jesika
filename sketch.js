let stars = [];
let Zs = [];
let maxZs = 7;
let crickets;
let startButton;
let currentState = "startScreen";
let firstClick = false;
let buttons = [];
let selectedButton = 0;
let songs = [];

const LOGICAL_W = 700;
const LOGICAL_H = 500;

let scaleFactor = 1;
let offsetX = 0;
let offsetY = 0;

function preload() {
  crickets = loadSound('crickets.mp3');
  songs = [
    loadSound('song1.mp3'),
    loadSound('song2.mp3'),
    loadSound('song3.mp3'),
    loadSound('song4.mp3')
  ];
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  frameRate(30);
  computeTransform();

  startButton = createButton("Click for Bruce");
  startButton.style("font-size", "23px");
  startButton.style("background-color", "#23db36");
  startButton.style("padding", "15px 30px");
  startButton.style("border", "3px solid black");
  startButton.mousePressed(startAvatar1);
  positionStartButton();

  buttons = [
    { x: 440, y: 290, width: 20, height: 10 },
    { x: 480, y: 290, width: 20, height: 10 },
    { x: 520, y: 290, width: 20, height: 10 },
    { x: 560, y: 290, width: 20, height: 10 }
  ];
}

function computeTransform() {
  let sx = windowWidth / LOGICAL_W;
  let sy = windowHeight / LOGICAL_H;
  scaleFactor = min(sx, sy);
  offsetX = (windowWidth - LOGICAL_W * scaleFactor) / 2;
  offsetY = (windowHeight - LOGICAL_H * scaleFactor) / 2;
}

function positionStartButton() {
  startButton.position(
    offsetX + (LOGICAL_W / 2 - 75) * scaleFactor,
    offsetY + (LOGICAL_H / 2 - 25) * scaleFactor
  );
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  computeTransform();
  if (startButton) positionStartButton();
}

function startAvatar1() {
  userStartAudio();
  crickets.loop();
  currentState = "avatar1";
  startButton.hide();
  firstClick = true;

  for (let i = 0; i < 80; i++) {
    stars.push({
      x: random(LOGICAL_W),
      y: random(0, 290),
      size: random(2, 4),
      speed: random(0.02, 0.2),
      offset: random(TWO_PI)
    });
  }

  for (let i = 0; i < 3; i++) {
    Zs.push({
      x: random(230, 280),
      y: random(250, 300),
      size: random(11, 35),
      alpha: 255
    });
  }
}

function draw() {
  if (currentState === "startScreen") {
    background(255);
    return;
  }

  push();
  translate(offsetX, offsetY);
  scale(scaleFactor);

  if (currentState === "avatar1") {
    drawAvatar1();
  } else if (currentState === "avatar2") {
    drawAvatar2();
  }

  pop();
}

function drawAvatar1() {
  background(37, 36, 63);

  noStroke();
  fill(255, 253, 232);

  for (let i = 0; i < stars.length; i++) {
    let star = stars[i];
    let scaleAmt = (sin(frameCount * star.speed + star.offset) + 1) / 2;
    let starSize = map(scaleAmt, 0, 1, star.size * 0.5, star.size * 1.5);
    ellipse(star.x, star.y, starSize, starSize);
  }

  fill(255, 253, 232);
  ellipse(500, 90, 100, 100);

  fill(184, 182, 164);
  ellipse(485, 80, 22, 22);
  ellipse(520, 110, 25, 25);
  ellipse(490, 120, 15, 15);

  fill(56, 99, 75);
  rect(0, 330, LOGICAL_W, 170);

  stroke(29, 48, 37);
  strokeWeight(3);

  line(80, 400, 95, 380);
  line(110, 400, 95, 380);
  line(110, 400, 120, 390);
  line(120, 390, 135, 400);

  line(430, 430, 447, 416);
  line(447, 416, 455, 430);
  line(455, 430, 481, 403);
  line(481, 403, 497, 430);
  line(497, 430, 503, 420);
  line(503, 420, 515, 430);

  line(560, 460, 575, 450);
  line(575, 450, 580, 460);
  line(580, 460, 597, 443);
  line(597, 443, 620, 460);

  for (let z of Zs) {
    fill(255, 255, 255, z.alpha);
    stroke(37, 36, 63);
    strokeWeight(1);
    textSize(z.size);
    textAlign(CENTER, CENTER);
    text('Z', z.x, z.y);

    if (z.alpha <= 128 && Zs.length < maxZs) {
      Zs.push({
        x: random(230, 280),
        y: random(250, 300),
        size: random(13, 35),
        alpha: 255
      });
    }

    z.y -= 1;
    z.alpha -= 0.9;

    if (z.y < 0) {
      z.y = random(270, 290);
      z.alpha = 255;
    }
  }

  stroke(80, 78, 87);
  strokeWeight(2);
  fill(14, 14, 15);
  ellipse(211, 342, 50, 20);
  ellipse(226, 355, 50, 20);
  ellipse(300, 333, 180, 80);

  triangle(190, 290, 200, 250, 230, 270);
  triangle(270, 290, 260, 250, 230, 270);
  ellipse(230, 295, 80, 60);

  fill(135, 130, 147);
  triangle(223, 297, 237, 297, 230, 303);

  fill(14, 14, 15);
  line(230, 303, 230, 308);
  arc(222, 309, 15, 12, 0, PI);
  arc(238, 309, 15, 12, 0, PI);
  arc(245, 285, 18, 10, 0, PI);
  arc(215, 285, 18, 10, 0, PI);

  stroke(242, 241, 235)

  line(210, 302, 180, 302);
  line(210, 302, 183, 290);
  line(210, 302, 183, 314);

  line(210 + 40, 302, 186 + 95, 302);
  line(210 + 40, 302, 183 + 95, 290);
  line(210 + 40, 302, 183 + 95, 314);

  stroke(80, 78, 87)

  push();
  translate(322, 367);
  rotate(radians(160));
  ellipse(0, 0, 140, 20);
  pop();

  noStroke();
  ellipse(345, 335, 90, 50);

  fill(255);
  textSize(23);
  textAlign(LEFT, TOP);
  stroke(37, 36, 63);
  strokeWeight(20);
  text("You found Bruce! \n Shh.. Bruce is sleeping.", 100, 100);
  text("Tap Bruce to wake him up.", 350, 230);
  noStroke()
  textSize(15)
  text("Psst.. turn your volume up.", 100, 460);
}

function drawAvatar2() {
  noStroke();
  background(36, 192, 227);
  fill(245, 235, 157);
  rect(0, 330, LOGICAL_W, 170);

  fill(182, 247, 252);
  stroke(255);
  strokeWeight(3);
  for (let i = 0; i < stars.length; i++) {
    let star = stars[i];
    let scaleAmt = (sin(frameCount * star.speed + star.offset) + 15) / 2;
    let starSize = map(scaleAmt, 0, 1, star.size * 0.5, star.size * 2.5);
    ellipse(star.x, star.y, starSize, starSize);
  }

  stroke(80, 78, 87);
  strokeWeight(2);
  fill(14, 14, 15);

  push();
  translate(342, 317);
  rotate(radians(120));
  ellipse(0, 0, 140, 20);
  pop();

  circle(270, 345, 60);
  circle(330, 345, 60);

  ellipse(300, 300, 80, 160);

  ellipse(264, 372, 50, 20);
  ellipse(334, 372, 50, 20);

  line(285, 372, 285, 300);
  line(313, 372, 313, 300);

  ellipse(280, 372, 30, 20);
  ellipse(318, 372, 30, 20);

  let rotationAmount = sin(frameCount * .17) * .02;

  push();
  rotate(rotationAmount);

  fill(14, 14, 15);
  triangle(190 + 70, 290 - 70, 200 + 70, 250 - 70, 230 + 70, 270 - 70);
  triangle(270 + 70, 290 - 70, 260 + 70, 250 - 70, 230 + 70, 270 - 70);
  ellipse(230 + 70, 295 - 70, 80, 60);

  fill(135, 130, 147);
  triangle(223 + 70, 297 - 70, 237 + 70, 297 - 70, 230 + 70, 303 - 70);

  fill(14, 14, 15);
  line(230 + 70, 303 - 70, 230 + 70, 308 - 70);
  arc(222 + 70, 309 - 70, 15, 12, 0, PI);
  arc(238 + 70, 309 - 70, 15, 12, 0, PI);
  arc(245 + 68, 285 - 68, 15, 15, PI, TWO_PI);
  arc(215 + 72, 285 - 68, 15, 15, PI, TWO_PI);

  stroke(242, 241, 235)
  line(210 + 70, 302 - 70, 180 + 70, 302 - 70);
  line(210 + 70, 302 - 70, 183 + 70, 290 - 70);
  line(210 + 70, 302 - 70, 183 + 70, 314 - 70);

  line(210 + 40 + 70, 302 - 70, 186 + 95 + 70, 302 - 70);
  line(210 + 40 + 70, 302 - 70, 183 + 95 + 70, 290 - 70);
  line(210 + 40 + 70, 302 - 70, 183 + 95 + 70, 314 - 70);

  pop();

  fill(201, 201, 201)

  rect(430, 280, 160, 100);

  noStroke()
  fill(79, 75, 75)
  rect(450, 245, 20, 35);
  rect(550, 245, 20, 35);
  rect(450, 245, 100, 20);

  stroke(33, 31, 31);
  circle(475, 340, 60);
  circle(545, 340, 60);

  for (let i = 0; i < buttons.length; i++) {
    fill(i === selectedButton ? 'green' : 'blue');
    rect(buttons[i].x, buttons[i].y, buttons[i].width, buttons[i].height);
  }

  fill(0);
  stroke(255);
  strokeWeight(4);
  textSize(26);
  text("Bruce is awake! \n Just in time for his dance party.", 100, 80);
  noStroke();
  text("Change the song if you want. Bruce won't mind.", 100, 430);
}

function mousePressed() {
  if (firstClick) {
    firstClick = false;
    return;
  }

  let mx = (mouseX - offsetX) / scaleFactor;
  let my = (mouseY - offsetY) / scaleFactor;

  if (currentState === "avatar1" && bruceHitboxAvatar1(mx, my)) {
    currentState = "avatar2";
    crickets.stop();
    songs[selectedButton].loop();
  } else if (currentState === "avatar2" && bruceHitboxAvatar2(mx, my)) {
    currentState = "avatar1";
    songs[selectedButton].stop();
    crickets.loop();
  }

  if (currentState === "avatar2") {
    for (let i = 0; i < buttons.length; i++) {
      if (
        mx > buttons[i].x &&
        mx < buttons[i].x + buttons[i].width &&
        my > buttons[i].y &&
        my < buttons[i].y + buttons[i].height
      ) {
        if (selectedButton !== i) {
          songs[selectedButton].stop();
          selectedButton = i;
          songs[selectedButton].loop();
        }
      }
    }
  }
}

function bruceHitboxAvatar1(x, y) {
  let bruceCenterX = 287;
  let bruceCenterY = 300;
  let bruceWidth = 222;
  let bruceHeight = 170;

  let normalizedX = (x - bruceCenterX) / (bruceWidth / 2);
  let normalizedY = (y - bruceCenterY) / (bruceHeight / 2);

  return (normalizedX ** 2 + normalizedY ** 2) <= 1;
}

function bruceHitboxAvatar2(x, y) {
  let bruceCenterX = 300;
  let bruceCenterY = 280;
  let bruceWidth = 150;
  let bruceHeight = 190;

  let normalizedX = (x - bruceCenterX) / (bruceWidth / 2);
  let normalizedY = (y - bruceCenterY) / (bruceHeight / 2);

  return (normalizedX ** 2 + normalizedY ** 2) <= 1;
}
