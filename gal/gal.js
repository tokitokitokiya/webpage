
let messages = [];
let currentIndex = 0;
let typingIndex = 0;
let typingField = 'message'; // 'name'または'message'
let typingTimer;
let typingSpeed = 100; // 1文字ごとに0.1秒
const fixedName = "55555"; // ← 名前は固定


$(".gallery-list").modaal({
    fullscreen:'true',//フルスクリーンモード
    before_open:function(){
        $('html').css('overflow-y', 'hidden');
    },
    after_cose:function(){
        $('html').css('overflow-y','scroll');
    },
});

function preload() {
  // messages.txt から読み込み（1行ごとに1要素の配列になる）
  lines = loadStrings("messages.txt");
}

function setup() {
  noCanvas();

    // 行をメッセージオブジェクトに変換
    for (let line of lines) {
        if (line.trim() !== "") {
        messages.push({ name: fixedName, text: line.trim() });
        }
    }

  typeNextMessage();

  // ボタンクリック時の処理
  document.getElementById("submit").addEventListener("click", () => {
    const name = document.getElementById("name").value;
    const text = document.getElementById("message").value;
    if (name && text) {
      displayMessage(name, text);
      clearForm();
    }
  });
}

// フォームに1文字ずつ入力し、送信
function typeNextMessage() {
  if (currentIndex >= messages.length) return;

  const { name, text } = messages[currentIndex];
  const nameInput = document.getElementById("name");
  const messageInput = document.getElementById("message");

  if (typingField === 'name') {
    nameInput.value = name.slice(0, typingIndex + 1);
    typingIndex++;
    if (typingIndex < name.length) {
      typingTimer = setTimeout(typeNextMessage, typingSpeed);
    } else {
      typingField = 'message';
      typingIndex = 0;
      typingTimer = setTimeout(typeNextMessage, typingSpeed);
    }
  } else if (typingField === 'message') {
    messageInput.value = text.slice(0, typingIndex + 1);
    typingIndex++;
    if (typingIndex < text.length) {
      typingTimer = setTimeout(typeNextMessage, typingSpeed);
    } else {
      setTimeout(() => {
        document.getElementById("submit").click();
        currentIndex++;
        typingField = 'name';
        typingIndex = 0;
        setTimeout(typeNextMessage, 2000); // 次のメッセージまで2秒待つ
      }, 500); // 入力完了から送信まで0.5秒
    }
  }
}

// チャットに表示
function displayMessage(name, text) {
  const container = document.getElementById("chat-container");
  const div = document.createElement("div");
  div.className = "message";
  div.textContent = `${name}：${text}`;
  container.prepend(div);
}

// 入力欄をクリア
function clearForm() {
  document.getElementById("name").value = "";
  document.getElementById("message").value = "";
}