<template>
  <div id="app">
    <jroll-infinite id="wrapper" ref="myjroll">
      <div class="bgImg"><img :src="userData.picture"></div>
      <div class="mask"></div>
      <header>
        <div class="userImg" v-show="!move">
          <div class="img" :style="{ backgroundImage:'url(' + userData.picture +')'}"></div>
        </div>
        <div class="nick" v-show="!move">{{userData.nick}}</div>
        <div class="signTxt">{{userData.signature}}</div>
        <div class="worksNum">作品：<span>{{userData.essayCount}}</span></div>
        <div class="triangle"></div>
      </header>
      <div class="content">
        <div class="contLi" v-for="(item,index) in list" @click="toDetail(item.essayId)" v-run="showText(index,n)">
          <div class="essayImg">
            <img class="animated" v-lazy="item.essayHomeUrl?item.essayHomeUrl:item.essayUrl" alt="" :onerror="logo">
          </div>
          <div class="context">
            <img src="../../assets/icon_l.svg" alt="">
            <p class="text">
              <span class="wordAni" v-for="word in item.copyInfo.split('')">{{word}}</span>
            </p>
            <img src="../../assets/icon_r.svg" alt="">
          </div>
        </div>

      </div>
    </jroll-infinite>
    <div class="floatImg" :class="direction" v-show="move">
      <div class="img" :style="{ backgroundImage:'url(' + userData.picture +')'}"></div>
    </div>
    <div class="floatNick" :class="direction" v-show="move">{{userData.nick}}</div>
    <div class="floatMask"></div>
    <div v-show="topShow" class="toTop" @click="returnTop"><img :src="src_top" alt=""></div>
    <download></download>
  </div>
</template>

<script>
  import download from '../../components/download'
  import 'jroll'
  import 'jroll-vue-infinite'
  import 'jroll-pulldown'
  import { animate } from 'animate.css'
  import { Request,fitScreen,wxShare } from "../../common/all.js"
export default{
  name: 'app',
  data(){
    return{
        userData:{},
        data:{},
        list:[],
        n:Math.floor($(window).height()/190-1),
        direction:'',
        move:false,
        topShow:false,
        scrolling:true,
        src_top: require('../../assets/btn-toTop-m.png'),
        logo: 'this.src="' + require('../../assets/defaulImg.png') + '"',
    }
  },
  beforeCreate(){
    let _this = this;
    $.ajax({
//      url:'http://jianmian.myfont.me/api/run/getUserInfo',
      url: 'http://192.168.248.216:8880/api/run/getUserInfo',
      type: 'post',
      data: {userId: Request.userId},
      dataType: 'jsonp',
      jsonpCallBack: 'successCallBack1',
      success: function (data) {
        _this.userData = data.resultData
      }
    })

  },
  created(){
      fitScreen()
//    console.log($('.contLi').eq(0).offset().top)
  },
  directives : {
    run (el, binding) {
      if (typeof binding.value == 'function')
        binding.value(el);
    }
  },
  methods: {
    toDetail(id){
      location.href = './share.html?essayType=LE&essayId=' + id + '&share=1'
    },
    returnTop(){
      if (!this.scrolling) {
        this.$refs.myjroll.jroll.scrollTo(0, 0, 300)
        this.direction = 'up'
        this.topShow = false
      }
    },
    showText(ind, n){
      let _this = this;
      if (ind < n) {
        return (el) => {
          $(el).find('.wordAni').each((index, item) => {
            let randomNum = Math.random() * 1000;
            $(item).fadeIn(randomNum)
            $(item).addClass('liShow')
          })
        }
      }
    },
    showText2(objs){
        objs.each((index,item)=>{
          if ($(item).offset().top <= $(window).height() - 190 && !$(item).hasClass('liShow')) {
            $(item).find('.wordAni').each((ind,word)=>{
              var randomNum = Math.random() * 1000;
              $(word).fadeIn(randomNum)
            })
            $(item).addClass('liShow')
          }
        })
    },
  },
  mounted(){
    let _this =this;
    let startY = '';

    this.$refs.myjroll.jroll.on("scrollStart", function() {
      startY = this.y
    })
    this.$refs.myjroll.jroll.on("scroll", function() {
        _this.scrolling = true;
      _this.showText2($('.contLi'))
      if(this.y<-190*7){
        _this.topShow = true
        _this.move = true
        $('.floatMask').fadeIn()
        _this.src_top =  require('../../assets/btn-toTop-m.png')
      }else{
        _this.topShow = false
        if(this.y<-30){
          _this.move = true
          $('.floatMask').fadeIn()
          if(this.y<startY){
            _this.direction = 'down'
          }
        }else{
            if(this.y>=0){
              setTimeout(()=>{
                _this.move = false
              },600)
              $('.floatMask').fadeOut()
            }
        }
        if(this.y >= -58 && this.y>startY){
          _this.direction = 'up'
        }
      }
    });
    this.$refs.myjroll.jroll.on("scrollEnd", function() {
      _this.scrolling = false;
      _this.src_top =  require('../../assets/btn-toTop-s.png')
    });
  },
  components:{
      download,
      'jroll-infinite':
      JRoll.VueInfinite({
        tip:'加载中…',
        completeTip: '<span class="no-more"></span>',
        pulldown: {
          iconArrow:'',
          iconLoading:'',
          textPull:'<span class="pullIcon1"></span>',
          textRelease:'<span class="pullIcon2"></span>',
          textLoading:'<span class="refreshAni"></span>',
          iconFinish:'<span></span>',
          textFinish:'<span></span>'
        },
        bottomed: function (complete) {
          var me = this
          $.ajax({
            // url:'http://jianmian.myfont.me/api/run/getMyHomePage',
            url: 'http://192.168.248.216:8880/api/run/getMyHomePage',
            type: 'post',
            data: {userId: Request.userId, pageNum: me.page+1, pageSize: 6},
            dataType: 'jsonp',
            jsonpCallBack: 'successCallBack2',
            success: function (data) {
                console.log(data)
              // 加入下拉刷新功能后需要判断complete是否为function类型，是，表示刷新，复位第1页；否，表示上拉加载下一页，拼接下一页数据
              if (typeof complete === 'function') {
                me.$parent.list = data.resultData.list
                complete()
              } else {
                me.$parent.data = data.resultData
                me.$parent.list = me.$parent.list.concat(data.resultData.list)
                me.total = data.resultData.pages;
                me.page = data.resultData.pageNum-1;
              }

              // 成功后执行该方法
              me.success()
            },
            error: function () {
              // 失败后执行该方法，会变更tip，显示错误提示
              me.error()
            }
          })
        },
        updated: function () {

        },
      }, {
        scrollBarY: true
      })
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/style.css";
#app
  position: absolute;
  top:0;
  bottom: 0;
  left:50%
  margin-left:-187.5px
  width: 375px
  #wrapper
    position: absolute;
    top: 0;
    bottom: 0;
    width: 100%;
    padding-bottom:60px;
    height:100%;
    box-sizing: border-box;
  .bgImg
    position absolute
    width 375px
    height 190px
    z-index 0
    overflow hidden
    img
      width 100%
      height 100%
      -webkit-filter blur(3px)
  .mask
    position:absolute;
    width:375px;
    height:190px;
    z-index:0;
    background: -webkit-linear-gradient(rgba(58,58,58,0.2), rgba(0,0,0,0.6));
  header
    width 375px
    height 190px
    padding-top 30px
    text-align  center
    position relative
    box-sizing  border-box
    .userImg
      position:absolute;
      left:50%;
      margin-left:-39px;
      top:30px;
      z-index:99;
      width 78px
      height 78px
      padding 5px
      box-sizing  border-box;
      background rgba(238,238,238,0.2)
      background-size cover
      border-radius 50%
      .img
        -moz-border-radius 50%
        border-radius 50%
        width 100%
        height 100%
        background: no-repeat center center
        background-size: cover
    .nick
      position:absolute;
      left:50%
      z-index:999
      transform:translateX(-50%)
      top:108px;
      width:90%
      font-size 20px
      color #F6D11B
      line-height 34px
      letter-spacing  1.11px
      text-align  center
      text-overflow  ellipsis
      white-space nowrap
      overflow hidden
    .signTxt
      line-height 16px
      font-size  12px
      color  #999999
      letter-spacing  0.67px
      width 90%
      margin 112px auto 0
      text-overflow ellipsis
      white-space  nowrap
      overflow  hidden
    .worksNum
      line-height 34px
      font-size 14px
      letter-spacing 0.78px
      color  #ccc
    .triangle
      position absolute
      bottom -8px
      left 50%
      margin-left -10px
      width 0
      height 0
      border-left 10px solid transparent
      border-right 10px solid transparent
      border-top 8px solid #333
      z-index 99
  .content
    width:375px
    .contLi
      position relative
      height 190px
      -webkit-box-sizing  border-box
      -moz-box-sizing  border-box
      box-sizing  border-box
      margin-bottom 6px
      z-index 1
      overflow hidden
      .essayImg
        width:100%;
        height:100%;
        margin:0 auto;
        text-align: center;
        overflow:hidden;
        position:relative;
        img
          position:absolute;
          z-index:0;
          width:100%;
          height:100%;
          transform:scale(1.2);
      .context
        position:absolute;
        bottom:5px;
        left:0;
        width:100%;
        height:24px
        line-height:24px;
        display:flex
        img
          width:30px
          height:18px
        img:nth-of-type(2)
          margin-top:4px
        .text
          flex:1
          text-overflow: ellipsis;
          white-space: nowrap;
          overflow: hidden;
          color:#F0F0F0;
          font-size:15px;
          span
            display:none
  .xs-plugin-pullup-up
    .no-more
      img
        width:100px
        margin:10px auto
  .toTop
    width:45px;
    position:fixed;
    bottom:60px;
    right:10px;
    z-index:99;
  .floatMask
    display:none
    width:375px;
    height:65px;
    position:fixed;
    top:0;
    left:0;
    background:linear-gradient(rgba(44,44,44,1),rgba(44,44,44,0));
  .floatImg
    position:fixed;
    left:50%;
    margin-left:-39px;
    top:30px;
    z-index:999;
    width 78px
    height 78px
    padding 5px
    box-sizing  border-box;
    background rgba(238,238,238,0.2)
    background-size cover
    border-radius 50%
    &.up
      animation:moveImgup 600ms;
      animation-fill-mode:forwards;
    &.down
      animation:moveImgdown 600ms;
      animation-fill-mode:forwards;
    @keyframes moveImgdown
      from{
        width:78px;
        height:78px;
        left:50%
        top:30px;
      }
      to{
        width:50px;
        height:50px
        top:5px;
        left:42%
      }
    @keyframes moveImgup
      from{
        width:50px;
        height:50px
        top:5px;
        left:42%
      }
      to{
        width:78px;
        height:78px;
        left:50%
        top:30px;
      }
    .img
      -moz-border-radius 50%
      border-radius 50%
      width 100%
      height 100%
      background: no-repeat center center
      background-size: cover
  .floatNick
    position:fixed;
    left:50%
    z-index:999
    transform:translateX(-50%)
    top:108px;
    width:90%
    font-size 20px
    color #F6D11B
    line-height 34px
    letter-spacing  1.11px
    text-align  center
    text-overflow  ellipsis
    white-space nowrap
    overflow hidden
    &.down
      animation:moveNamedown 600ms;
      animation-fill-mode:forwards;
      @keyframes moveNamedown
        from{
          top:108px
          left:50%
          color:#F6D11B
          font-size:20px
        }
        to{
          color:#fff;
          top:13px;
          left:56%
          font-size:16px
        }
    &.up
      animation:moveNameup 600ms;
      animation-fill-mode:forwards;
      @keyframes moveNameup
        from{
          color:#fff;
          top:13px;
          left:56%
          font-size:16px
        }
        to{
          top:108px
          left:50%
          color:#F6D11B
          font-size:20px
        }
  .pullIcon1
      display:block;
      width:100px;
      height:30px;
      background:url(../../assets/pullIcon1.png) no-repeat;
      background-size:auto 100%;
      margin:0 auto;
  .pullIcon2
    display:block;
    width:100px;
    height:30px;
    background:url(../../assets/pullIcon2.png) no-repeat;
    background-size:auto 100%;
    margin:0 auto;
  .refreshAni
    display:block;
    margin:0 auto;
    width:100px;
    height:30px;
    background:url(../../assets/refreshing.png) no-repeat;
    background-position:0 0;
    background-size:100% auto;
    animation:refreshing 1200ms steps(28) infinite;
  @keyframes refreshing
    from{background-position:0 0}
    to{background-position:0 -840px}
  .jroll-infinite-tip
    text-align: center
    .no-more
      display:block
      background:url(../../assets/no-more.png) no-repeat center center;
      background-size:auto 100%;
      height:28px;
      margin:10px auto;
</style>
