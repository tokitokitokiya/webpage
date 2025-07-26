
/* 1. 変数の定義 */
let bgImage;
const NUM_POINTS = 100; //点の数
const MAX_LINE_DIST = 100; //線の数
const points = []; //点の座標と速度配列

function preload() {
  // 画像を読み込み
  bgImage = loadImage('kaitei.jpg');
}

function setup() {
  /* 2. キャンバスの初期化 */
  createCanvas(windowWidth, windowHeight); // 画面サイズ
  background(0);
  stroke(255, 100);


  /* 3. 点群の初期化 */
  for (let i = 0; i < NUM_POINTS; i++) {
    const point = {
        x: random(width),
        y: random(height),
        vx: random(-1, 1),
        vy: random(-1, 1),
    };
    points.push(point);
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight); // 高さは固定、横幅だけ画面に合わせる
}

function draw() {
  background(250);
    // キャンバスの横幅に画像を合わせる
  let imgAspect = bgImage.height / bgImage.width;
  let newWidth = 500;
  let newHeight = newWidth * imgAspect;
  if (width>=500){
    newWidth = width;
    newHeight = width * imgAspect;
  }

  // 背景に画像を表示
  image(bgImage, 0, 0, newWidth, newHeight);

  /* 4. 点群のアップデート */
  for (const p of points) {
    p.x += p.vx;
    p.y += p.vy;
    if (p.x < 0 || p.x > width) { 
      p.vx *= -1; 
    }
    if (p.y < 0 || p.y > height) {
       p.vy *= -1; 
    }
    point(p.x, p.y);
  }

  /* 5. 点を線で繋ぐ */
  for (let i = 0; i < points.length; i++) {
    for (let j = i + 1; j < points.length; j++) {
      const d = dist(points[i].x, points[i].y, points[j].x, points[j].y);
      if (d <MAX_LINE_DIST) {
        line(points[i].x, points[i].y, points[j].x, points[j].y);
      }
    }
  }

}