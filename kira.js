
/* 1. 変数の定義 */
let bgImage;
let mabuta, kurome;
let imgAspect;
let newHeight=800;
let newWidth=800;
let buttons = [];
let eyes = [];
let reSize = false;
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
  bgImage = loadImage('img/haikei2.jpg');
  mabuta = loadImage("img/mabuta.png"); // 白目用
  kurome = loadImage("img/kurome.png"); // 黒目または瞳用
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

  //目玉の画像を挿入
  eyes.push(new Eye(0, newHeight*0.2, 100, newWidth*0.2, newHeight*0.2)); 
  
  reSize=true;
}


function draw() {
  background(250);
  // キャンバスの横幅に画像を合わせる
  imgAspect = bgImage.width / bgImage.height;
  newHeight = 800;
  newWidth = newHeight * imgAspect;
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


  for (let eye of eyes) {
    if(reSize){
      eye.wid=newWidth;
      eye.heigh=newHeight;
      eye.koushin(mouseX,mouseY);
      reSize=false;
      console.log(eye.wid,eye.heigh);
    }
    eye.show();
  }
}



class Eye {
  constructor(x, y, r, wid, heigh) {
    this.x = x;
    this.y = y;
    this.wid = wid;
    this.heigh = heigh;
    this.mx=1;
    this.my=1;
    this.angle=1;
    this.r=r;

    this.shouldFollow = true;         // マウスを追うかどうかのフラグ
    this.nextChangeTime = millis() + random(500, 2000); // 次に追うかどうかを切り替える時間
  }

  updateState() {
    if (millis() > this.nextChangeTime) {
      this.shouldFollow = random() < 0.5;  // 50%の確率で追う／追わないを切り替える
      this.nextChangeTime = millis() + random(1000, 3000); // 次の切り替えまでの時間
    }
  }

  koushin(mousex,mousey){
    this.mx = mousex;
    this.my = mousey;
    this.angle = Math.atan2(this.my-this.y, this.mx-this.x);
  }

  show() {
    this.updateState(); // 状態更新
    push();
    translate(this.x, this.y);
    let rx=this.mx-this.x;
    let ry=this.my-this.y;
    fill(254);
    ellipse(this.x,this.y,100,100);

    if(sq(rx)+sq(ry)<=sq(this.r/2)){
      image(kurome, this.mx, this.my,this.wid,this.heigh);
    }else{
      rotate(this.angle);
      image(kurome,this.r/2, this.r/2, this.wid,this.heigh);
    }
    pop();

    let t = 0.1;
    let easedT = this.easeInOut(t);

    // 黒目（png2.png）
    //image(kurome, this.pos.x, this.pos.y,newWidth*0.2,newHeight*0.2);
    // 白目（png1.png）
    image(mabuta, this.x, this.y,newWidth*0.2,newHeight*0.2);
  }

  easeInOut(t) {
    return t * t * (3 - 2 * t);
  }
}


/* キャンバスのリサイズ */
function windowResized() {
  resizeCanvas(windowWidth, windowHeight); // 高さは固定、横幅だけ画面に合わせる
  reSize=true;
}