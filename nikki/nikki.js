/*fcはnikkiのファイル数を入力（表示）*/
var fc=4;
var urllist=[];


function main(){
  var str='nImg/nikki';
  var i=1;
  
//ulrlistにurlの文字列を収納
  for(var r=0;r<fc;r++){
    urllist.push(str+i+'.jpg');
    i++;
  }
  
  console.log(urllist);

  /*document.createElementで指定したタグ（src）を作る　imgcreate=<src></src> */
  /*imgcreate.srcでimgcreateの<img></img>の参照先にurllist[i]を入れる*/
  /*document.getElementById('listp').appendChild(imgcreate) で繰り返しごとにHTMLのdiv下に要素を追加*/
  for (var l = 0; l < urllist.length; l++) {
    var imgcreate = document.createElement('img'); 
    imgcreate.src = urllist[l]; 
    imgcreate.classList.add("popwin");
    imgcreate.classList.add("nikki");
    document.getElementById('listp').appendChild(imgcreate); 
}

}

$(document).ready(function(){

//画像を画面内ウィンドウで表示
  $(".popwin").modaal({
    type: 'image',
    overlay_close:true, //モーダル背景クリック時に閉じるか
    before_open:function() {//モーダルが開く前に行う動作
      $('html').css('overflow-y','hidden');/*縦スクロールバーを出さない*/
    },
    after_close:function() {//縦スクロールバーを出す
      $('html').css('overflow-y','scroll');

    }
    
  })





  $('.rotateDownHoverTrigger').on('mouseenter',function(){
    $(this).removeClass('nikki');//要素にマウスが乗ったらrotateDoenというクラス名①をつける
    $(this).addClass('fadeUp');//要素にマウスが乗ったらfadeUpというクラス名②をつける
    console.log("ninsiki");
  })

  $('.rotateDownHoverTrigger').on('mouseleave',function(){
    $(this).addClass('nikki');//要素にマウスが乗ったらrotateDoenというクラス名①を外す
    $(this).removeClass('fadeUp');//要素にマウスが乗ったらfadeUpというクラス名②を外す
  })

  $('.rotateDownHoverTrigger').click(function(){
    $(this).addClass('popUp')//隠れていた要素に動かしたいファイル名を付与
    $(this).addClass('disp_none')//動きの機転となるクラス名に画面非表示のクラス名付与
  })

})

function itemn(i){
    document.getElementById('list').src=urllist[i-1];
    console.log(document.getElementById('listItem').src);
  }