
/* 1. 変数の定義 */
let bgImage;
let buttons = [];
const buttonPositions = [
  { x: 0.1, y: 0.225 },
  { x: 0.5, y: 0.25 },
  { x: 0.7, y: 0.6 },
  { x: 0.3, y: 0.75 },
  { x: 0.8, y: 0.4 }
];
const NUM_POINTS = 80; //点の数
const MAX_LINE_DIST = 120; //線の数
const points = []; //点の座標と速度配列

function preload() {
  // 画像を読み込み
  bgImage = loadImage('img/haikei.jpg');
}

function setup() {
  /* 2. キャンバスの初期化 */
  createCanvas(windowWidth, windowHeight); // 画面サイズ
  background(0);
  stroke(255, 80);


  /* 3. 点群の初期化 */
  for (let i = 0; i < NUM_POINTS; i++) {
    const pointxy = {
        x: random(width),
        y: random(height),
        vx: random(-1, 1),
        vy: random(-1, 1),
    };
    points.push(pointxy);
  }

    // ボタンの生成
  for (let i = 0; i < buttonPositions.length; i++) {
    const btn = createButton('');
    btn.style('position', 'absolute');
    btn.style('z-index', '10');
    btn.style('border', 'none');
    btn.style('padding', '0');
    btn.style('background', 'none');

    // ボタンに画像を入れる
    const img = createImg(`img/blockt.png`, `btn${i + 1}`);
    img.parent(btn);
    img.style('width', '100%');
    img.style('height', '100%');
    img.style('object-fit', 'cover');

    // イベントも任意に追加
    btn.mousePressed(() => {
      console.log(`ボタン${i + 1} clicked`);
    });

    buttons.push(btn);
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight); // 高さは固定、横幅だけ画面に合わせる
}

function draw() {
  background(250);
    // キャンバスの横幅に画像を合わせる
  let imgAspect = bgImage.width / bgImage.height;
  let newHeight = 800;
  let newWidth = newHeight * imgAspect;
  if (height>=800){
    newHeight = height;
    newWidth = newHeight * imgAspect;
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

  // ボタン位置・サイズを更新
  // 画像に対するn%の幅
  const btnWs = [
    newWidth * 0.05,
    newWidth * 0.1,
    newWidth * 0.1,
    newWidth * 0.1,
    newWidth * 0.1
  ]; 
  const btnHs = [
    newHeight * 0.05,
    newHeight * 0.1,
    newHeight * 0.1,
    newHeight * 0.1,
    newHeight * 0.1
  ];

  for (let i = 0; i < buttons.length; i++) {
    const pos = buttonPositions[i];
    const x = newWidth * pos.x;
    const y = newHeight * pos.y;

    buttons[i].position(x, y);
    buttons[i].size(btnWs[i], btnHs[i]);
  }


}