var data = ['iPhone7','thinkpad','Xiaomi笔记本','佳能相机','50元话费','谢谢参与'],
    timer = null,
    flag = 0;


window.onload = function(){
  var title = document.getElementById('title'),
      play = document.getElementById('play'),
      stop = document.getElementById('stop');
  // 开始抽奖
  play.onclick = playFun;
  stop.onclick = stopFun;

  // 键盘事件
  document.onkeyup = function(e){
    e = e || window.event;
    if(e.keyCode == 13){
      if(flag == 0){
        playFun();
        flag = 1;
      }else{
        stopFun();
        flag = 0;
      }
    }
  }

  function playFun(){
    clearInterval(timer);
    timer = setInterval(function(){
      var random=Math.floor(Math.random()*data.length);
      title.innerHTML = data[random];
    },50);
    play.style.background = '#999';
    flag = 1;
  }
  function stopFun(){
    clearInterval(timer);
    play.style.background = '#036';
    flag = 0;
  }

};