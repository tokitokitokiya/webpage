const input = document.getElementById('nameInput');
const text = '海底探査ロボットX-21';
let index = 0;

$(".gallery-list").modaal({
    fullscreen:'true',//フルスクリーンモード
    before_open:function(){
        $('html').css('overflow-y', 'hidden');
    },
    after_cose:function(){
        $('html').css('overflow-y','scroll');
    },
});


function autoType() {
    if (index < text.length) {
        input.value += text.charAt(index);
        index++;
        setTimeout(autoType, 120); // 文字ごとの間隔（ms）
    }
}

// ページ表示後に少し待ってから開始
setTimeout(autoType, 1000);