
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
  { x: 1/12, y: 1/6 },
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
  mabuta = loadImage("img/mabuta2.png"); // 白目用
  kurome = loadImage("img/kurome2.png"); // 黒目または瞳用
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
  eyes.push(new Eye(newWidth*1/12, newHeight*1/6, 50, newWidth*0.2, newHeight*0.2)); 
  
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
    eye.koushin(mouseX,mouseY);
    eye.show();
  }
}



class Eye {
  constructor(x, y, r, wid, heigh) {
    //x,y=画像の原点、wid、heigh＝画像の大きさ,sx,sy＝センターまでの補正
    this.y = y;
    this.wid = wid;
    this.heigh = heigh;
    this.mx=1;
    this.my=1;
    this.angle=1;
    this.r=r;
    this.sx=wid*0.3;
    this.sy=-heigh*0.3;

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
    this.angle = Math.atan2(this.my-(this.y+this.sy), this.mx-(this.x+this.sx));
    this.x = newWidth/12;
    this.y = newHeight/6;
    this.sx = newWidth*0.05;
    this.sy = newHeight*0.08;
    this.wid = newWidth/12;
    this.heigh = newHeight/6;

  }

  show() {
    this.updateState(); // 状態更新
    let rx=this.mx-(this.x+this.sx);
    let ry=this.my-(this.y+this.sy);

    if(sq(rx)+sq(ry)*4<=sq(this.r/3)){
      image(kurome, this.mx-this.sx, this.my-this.sy,this.wid,this.heigh);
      //image(kurome, newWidth/12,newHeight/6,newWidth/12,newHeight/6);
    }else{
      image(kurome,this.r*cos(this.angle)/3+(this.x), this.r*sin(this.angle)/8+(this.y), this.wid,this.heigh);
      //ellipse((this.x), (this.y),this.r*2);
      //console.log(this.r*cos(this.angle)/2-this.sx);
    }


    let t = 0.1;
    let easedT = this.easeInOut(t);

    // 黒目（png2.png）
    //image(kurome, newWidth/12,newHeight/6,newWidth/12,newHeight/6);
    // 白目
    image(mabuta, this.x,this.y,this.wid,this.heigh);
    //fill(100,100);
    //ellipse(this.x+this.sx, this.y+this.sy,this.r/3*2);
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