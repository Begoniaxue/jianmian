/**
 * Created by founder on 2017/7/27.
 */
//格式化时间
export function formatDate(date,fmt){
  if(/(y+)/.test(fmt)){
    fmt = fmt.replace(RegExp.$1, (date.getFullYear()+'').substr(4-RegExp.$1.length));
  }
  let o = {
    'M+': date.getMonth()+1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds()
  }
  for(let k in o){
    let str = o[k]+'';
    if(new RegExp(`(${k})`).test(fmt)){
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length===1)?str:padLeftZero(str));
    }
  }

  return fmt;
};
function padLeftZero(str) {
  return ('00' + str).substr(str.length);
}
//判断页面可见/不可见
export function visProp(visiblePageDoSomething){
  var visProp = getHiddenProp();
  if (visProp) {
    var evtname = visProp.replace(/[H|h]idden/, '') + 'visibilitychange';
    document.addEventListener(evtname, function () {
      if(document[getVisibilityState()] != 'visible'){
       visiblePageDoSomething()
      }
    },false);
  }
}
function getHiddenProp(){
  var prefixes = ['webkit','moz','ms','o'];

  // if 'hidden' is natively supported just return it
  if ('hidden' in document) return 'hidden';

  // otherwise loop over all the known prefixes until we find one
  for (var i = 0; i < prefixes.length; i++){
    if ((prefixes[i] + 'Hidden') in document)
      return prefixes[i] + 'Hidden';
  }

  // otherwise it's not supported
  return null;
}
function getVisibilityState() {
  var prefixes = ['webkit', 'moz', 'ms', 'o'];
  if ('visibilityState' in document) return 'visibilityState';
  for (var i = 0; i < prefixes.length; i++) {
    if ((prefixes[i] + 'VisibilityState') in document)
      return prefixes[i] + 'VisibilityState';
  }
  // otherwise it's not supported
  return null;
}

//替换数据中的换行符\n和设置首行缩进字符
export function formatTxt(txt){
  txt = txt.replace(/(\n)|(\\n)/g,"</br>").replace(/(  )|(&nbsp;&nbsp;)/g,"<span style='visibility: hidden'>汉</span>");
//      let ltxt =  ntxt.replace(/  /g,"<span style='visib)ility: hidden'>汉</span>")
  return txt
}
//音乐自动播放hack
export function playHack(){
  document.addEventListener("WeixinJSBridgeReady", function () {
    if($('.music').hasClass('play')){
      $('#audio').get(0).play();
    }
  }, false);
  document.addEventListener('YixinJSBridgeReady', function() {
    if($('.music').hasClass('play')) {
      $('#audio').get(0).play();
    }
  }, false);
}
//改变文章字体大小
export function resetFontSize(num,obj){
  console.log(obj)
  for(var i=0;i<obj.length;i++) {
    console.log(parseInt(num))
    var fontSize = obj.eq(i).css('fontSize').substring(0,2);
    if(parseInt(num)>0 && fontSize>=25){
      obj.eq(i).css('fontSize','27px')
    }else if(parseInt(num)<0 && fontSize<=21){
      obj.eq(i).css('fontSize','19px')
    }else{
      obj.eq(i).css('fontSize',fontSize-0+num+'px')
    }
    console.log(obj.eq(i).css('fontSize'))

  }
}

