/**
 * Created by founder on 2017/8/15.
 */
//获得文章ID
function getUserInfo() {
  var name, value;
  var str = location.href;
  var num = str.indexOf("?");
  var num1 = str.indexOf("#");
  if(num1 != -1){
    str = str.substring(num + 1,num1);
  }else{
    str = str.substring(num + 1);
  }
  var arr = str.split("&");
  for (var i = 0; i < arr.length; i++) {
    num = arr[i].indexOf("=");
    if (num > 0) {
      name = arr[i].substring(0, num);
      value = arr[i].substr(num + 1);
      this[name] = value;
    }
  }
}
var Request = new getUserInfo();
let url = 'http://api.jianmian.myfont.me';
// let url='http://192.168.248.216:8880';
export{
  Request,
  url
}
//自适应屏幕
export function fitScreen(){
  function setScale(value) {
    if (window.top !== window) {
      return;
    }
    var pageScale = 1;
    var width = value || 375;
    pageScale = width/375;
    // meta
    var content = 'width=375, initial-scale=' + pageScale + ', maximum-scale=' + pageScale + ', user-scalable=no';
    document.getElementById('viewport').setAttribute('content', content);
  }
  setScale(document.documentElement.clientWidth);
  window.onorientationchange=function(){
    setTimeout(function(){
      if(window.orientation==180||window.orientation==0){
        setScale(screen.width)
      }
      if(window.orientation==90||window.orientation==-90){
        setScale(screen.height)
      }
    },10)
  };
}
 //微信分享接口调用

export function wxShare(wx,title,imgUrl,desc){

  var link = location.href.indexOf('#')>-1?location.href.substring(0,location.href.indexOf('#')):location.href.substring(0);
  $.ajax({
    url:"http://jianmian.myfont.me/wx/sign/getWxSign",
    data:{
      url:link
    },
    type:"get",
    dataType:"jsonp",
    jsonpCallback: "successCallback1",
    success:function(data){
      console.log(data)
      var result = data.resultData;
      if(data.code==1000){
        // var appId = result.appId,timestamp=result.timesTamp,nonceStr=result.timesTamp,signature=result.timesTamp;
        wx.config({
          debug:false,
          appId:result.appId,
          timestamp:result.timesTamp,
          nonceStr:result.nonceStr, // 必填，生成签名的随机串
          signature:result.signature,// 必填，签名，见附录1
          jsApiList: ['onMenuShareTimeline','onMenuShareAppMessage','onMenuShareQQ','onMenuShareQZone'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
        })
      }else{
        makeToast(data.msg)
      }
    }
  })
  wx.ready(function() {
    wx.onMenuShareTimeline({
      title: title, // 分享标题
      link: link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
      imgUrl: imgUrl, // 分享图标
      success: function () {
        // 用户确认分享后执行的回调函数
        // alert('分享成功')
      },
      cancel: function () {
        // 用户取消分享后执行的回调函数
        // alert('取消分享')
      }
    });
    wx.onMenuShareAppMessage({
      title: title, // 分享标题
      link: link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
      imgUrl: imgUrl, // 分享图标
      desc: desc,
      success: function () {
        // 用户确认分享后执行的回调函数
        // alert('分享成功')
      },
      cancel: function () {
        // 用户取消分享后执行的回调函数
        // alert('取消分享')
      }
    });
    wx.onMenuShareQQ({
      title: title, // 分享标题
      link: link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
      imgUrl: imgUrl, // 分享图标
      desc: desc,
      success: function () {
        // 用户确认分享后执行的回调函数
        // alert('分享成功')
      },
      cancel: function () {
        // 用户取消分享后执行的回调函数
        // alert('取消分享')
      }
    });
    wx.onMenuShareQZone({
      title: title, // 分享标题
      link: link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
      imgUrl: imgUrl, // 分享图标
      desc: desc,
      success: function () {
        // 用户确认分享后执行的回调函数
        // alert('分享成功')
      },
      cancel: function () {
        // 用户取消分享后执行的回调函数
        // alert('取消分享')
      }
    });
  })
}
