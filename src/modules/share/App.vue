<template>
  <div id="app">
    <div v-if="isBlank" class="blankBox" :style="{height:winHeight-120+'px'}"><img class="blankImg" src="../../assets/pic_delete.png"></div>
    <!--普通模板-->
    <div v-if="data.longTemplate && data.longTemplate.templateClass=='pt'" class="longModule" :style="{ backgroundImage:'url('+data.longTemplate.templateBaseInfo.backBottomUrl+')'}">
      <div class="absolute bgTop"><img :src="data.longTemplate.templateBaseInfo.backTopUrl" alt=""></div>
      <header class="absolute"><img :src="data.essayUrl" alt="" class="banner"></header>
      <div class="userMes absolute" v-if="styleObject.left" :style="{ left:styleObject.left+'px',top:styleObject.top+'px' }">
        <span v-if="!share || (share && data.isSm==1)">
          <div class="fl userImg">
            <img :src="data.picture" :onerror="logo" @click="toUserPage(data.userId)" alt="">
          </div>
          <div v-for="property in data.longTemplate.propertiesList" v-if="property.propertyType==2" class="fl text_center textFont2" :style="{ fontFamily:myfont,color:property.propertyColor,fontSize:property.fontSize>2?property.fontSize/2+'px':fontSize[property.fontSize]}">{{data.nick}}·著</div>
        </span>
        <div v-for="property in data.longTemplate.propertiesList" v-if="property.propertyType==1" class="fl text_center textFont1" :style="{fontFamily:myfont,color:property.propertyColor,fontSize:property.fontSize>2?property.fontSize/2+'px':fontSize[property.fontSize]}">{{data.updateDate | formatDate}}</div>
      </div>
      <div v-for="property in data.longTemplate.propertiesList" v-if="property.propertyType==6"  class="context textFont6" :style="{fontFamily:myfont,color:property.propertyColor,fontSize:property.fontSize>2?property.fontSize/2+'px':fontSize[property.fontSize],paddingTop:property.propertyTop/2+'px'}">
        <div class="part" :style="{minHeight:winHeight-property.propertyTop/2-86+'px',backgroundImage:'url('+data.longTemplate.templateBaseInfo.moduleBackUrl+')',margin:'0 '+property.propertyLeft/2+'px'}">
            <div v-for="list in data.essayCopyList" v-if="list.copyPosition==0">
              <img v-if="list.copyUrl" class="previewer-demo-img" v-lazy="list.copyUrl" alt="" @click="show(list.flag)" :style="{width:list.width+'px'}">
              <p v-if="list.copyInfo" class="text_part text"  v-html="formatTxt(list.copyInfo)" :style="{textAlign:align[list.alignType],fontSize:list.fontSize>2?list.fontSize/2+'px':fontSize[list.fontSize],color:list.fontColor,fontWeight:fontWeight[list.isBold],fontStyle:fontStyle[list.isItalic],textDecoration:textDecoration[list.isUnderline]}"></p>
            </div>
            <div v-for="list in data.essayCopyList" v-if="list.copyPosition==1">
              <img v-if="list.copyUrl" class="previewer-demo-img" v-lazy="list.copyUrl" alt="" @click="show(list.flag)" :style="{width:list.width+'px'}">
              <p v-if="list.copyInfo" class="text_part text" v-html="formatTxt(list.copyInfo)" :style="{textAlign:align[list.alignType],fontSize:list.fontSize>2?list.fontSize/2+'px':fontSize[list.fontSize],color:list.fontColor,fontWeight:fontWeight[list.isBold],fontStyle:fontStyle[list.isItalic],textDecoration:textDecoration[list.isUnderline]}"></p>
            </div>
        </div>
        <div class="bgDown"><img :src="data.longTemplate.templateBaseInfo.backDownUrl" alt=""></div>
      </div>
    </div>
    <!--书信模板-->
    <div v-if="data.longTemplate && data.longTemplate.templateClass=='sx'" class="longModule letterModule" :style="{ background:'url('+data.longTemplate.templateBaseInfo.backBottomUrl+') repeat-y center top',backgroundSize:'100% auto'}">
      <div class="moduleBox">
        <img :src="data.longTemplate.templateBaseInfo.moduleTopUrl" alt="" class="moduleTop">
        <div class="moduleContent" :style="{background:'url('+data.longTemplate.templateBaseInfo.moduleBottomUrl+') repeat-y center top',backgroundSize:'100% auto'}">
          <div class="userMes" v-for="property in data.longTemplate.letterPropertiesList" v-if="property.propertyType==0" :style="{ fontFamily:myfont,color:property.textColor,fontSize:property.fontSize/2+'px',
          textAlign:align[property.alignType],fontWeight:fontWeight[property.isBold],
          fontStyle:fontStyle[property.isItalic],textDecoration:textDecoration[property.isUnderline]}">{{property.textInfo}}</div>
          <div v-for="property in data.longTemplate.letterPropertiesList" v-if="property.propertyType==1"  class="context part" :style="{fontFamily:myfont,color:property.textColor,fontSize:property.fontSize/2+'px',
          textAlign:align[property.alignType],fontWeight:fontWeight[property.isBold],
          fontStyle:fontStyle[property.isItalic],textDecoration:textDecoration[property.isUnderline]}">
            <div v-for="list in data.essayCopyList" v-if="list.copyPosition==1">
              <img v-if="list.copyUrl"  class="previewer-demo-img" v-lazy="list.copyUrl" alt="" @click="show(list.flag)" :style="{width:list.width+'px'}">
              <p v-if="list.copyInfo" class="text_part text"  v-html="formatTxt(list.copyInfo)" :style="{textAlign:align[list.alignType],fontSize:list.fontSize/2+'px',fontWeight:fontWeight[list.isBold],fontStyle:fontStyle[list.isItalic],textDecoration:textDecoration[list.isUnderline]}"></p>
            </div>
            <div v-for="list in data.essayCopyList" v-if="list.copyPosition==0">
              <img v-if="list.copyUrl" class="previewer-demo-img" v-lazy="list.copyUrl" alt="" @click="show(list.flag)" :style="{width:list.width+'px'}">
              <p v-if="list.copyInfo" class="text_part text" v-html="formatTxt(list.copyInfo)" :style="{textAlign:align[list.alignType],fontSize:list.fontSize/2+'px',fontWeight:fontWeight[list.isBold],fontStyle:fontStyle[list.isItalic],textDecoration:textDecoration[list.isUnderline]}"></p>
            </div>
          </div>
          <div class="inscribe fr" v-for="property in data.longTemplate.letterPropertiesList" v-if="property.propertyType==2" :style="{ fontFamily:myfont,color:property.textColor,fontSize:property.fontSize/2+'px',
           textAlign:align[property.alignType],fontWeight:fontWeight[property.isBold],
          fontStyle:fontStyle[property.isItalic],textDecoration:textDecoration[property.isUnderline]}">{{property.textInfo}}</div>
        </div>
        <img :src="data.longTemplate.templateBaseInfo.moduleDownUrl" alt="" class="moduleDown">
      </div>
    </div>
    <preview v-if="!isBlank" :imgs="list" ref="preview"></preview>
    <div v-if="!isBlank && data.musicLink" id="music" v-on:click="musicFn" :style="{right:musicWidth/2-0+5+'px'}">
      <div class="music"  :class="isPlay"><audio id="audio" :src="data.musicLink" style="display: none" preload autoplay loop></audio></div>
    </div>
    <recommend v-if="!isBlank &&　data.longTemplate" :bgImg="data.longTemplate.templateBaseInfo.backBottomUrl"></recommend>
    <div v-if="share">
      <div style="height:57px" v-if="!isBlank"></div>
      <download></download>
    </div>

  </div>
</template>

<script>
  import FontFaceObserver from 'fontfaceobserver'
  import wx from 'weixin-js-sdk'
  import { Request,url,fitScreen,wxShare } from "../../common/all.js"
  import { formatDate,visProp,formatTxt,playHack,resetFontSize } from "../../common/js.js"
  import preview from "../../components/preview"
  import download from '../../components/download'
  import recommend from '../../components/recommend'
  import { hybrid } from "../../common/app.js"
export default {
  name: 'app',
  data() {
    return {
      data:{},
      winHeight:$(window).height(),
      logo: 'this.src="' + require('../../assets/userImg.png') + '"',
      isPlay:'play',
      styleObject:{},
      myfont:'',
      list:[],
      isHasTxt:false,
      musicWidth:$(window).width()-375,
      isBlank:false,
      fontSize:['23px','23px','23px'],
      align:['justify','right','center'],
      fontWeight:['normal','bold'],
      fontStyle:['normal','italic'],
      textDecoration:['none','underline'],
      share:Request.share,
      wxTitle:'绝不能错过的精彩内容-来自见字如面',
      wxImgUrl:'http://zitixiu.xiezixiansheng.com/xiuxiu/Other/170705/06dc7acd-1765-4751-9d9b-b578a8858c4a.png',
      wxDesc:'值得阅读的精美、精致、精品好文章，与作者产生共鸣，让自己提升品位。无论是生活感悟、旅行趣闻、兴趣分享，还是宝贵经验，这里应有尽有。见字如面，随时随地与大家分享你的多样情怀'
    }
  },
  beforeCreate() {
    let that = this;
    $.ajax({
      url: url+'/api/run/getEssayById',
      type: 'post',
      data: {
        'essayType':Request.essayType,
        'essayId': Request.essayId,
        "clientType":'h5',
        "userId":Request.userId
      },
      dataType: "jsonp",
      jsonpCallback: "successCallback",
      success: function (data) {
          let result =data.resultData;
          console.log(result)
          let count=0;
        if (data.code = 1000 && result) {
            var label = '';
            if( result.labelGroupList){
             label= result.labelGroupList[0].labelGroupName?'—'+result.labelGroupList[0].labelGroupName+'—':''
            }
            var nick =  (result.isSm == 1) ? result.nick : '';
          document.title = that.wxTitle =result.essayTitle + label + nick +'—精选文章推荐—见字如面，随时随地分享精美文章' ;

          var essayArray = [];
          if(result.essayCopyList){
            result.essayCopyList.forEach((item,index)=>{
              if(item.copyUrl){
                item.flag = count;
                count++;
                that.list.push({'src':item.copyUrl})

              }
              if(item.fontSize>54){
                item.fontSize = 54
              }
              if(item.copyInfo){
                that.isHasTxt = true;
                essayArray.push(item.copyInfo)
              }
            })
          }
          if(essayArray.length>0){
            that.wxDesc = essayArray[0];
          }
          that.data =result;
          that.userMesPos(result.longTemplate.propertiesList,that)
          that.getFont(result.fontLink,result.fontName,that)
          if(result.longTemplate.templateBaseInfo){
              var img = new Image();
                  img.src = result.longTemplate.templateBaseInfo.backDownUrl;
                  img.onload=function(){
                      var _h = $('.bgDown').height();
                      $('.part').css('min-height',that.winHeight-$('.part').offset().top-_h)
                    console.log(that.winHeight,$('.part').offset().top,_h)
                  }
          }
        }else if(!result){
          that.isBlank = true
        }
      },
      complete:function(){
          if(!Request.share){
            if (navigator.userAgent.indexOf('Android') > -1 || navigator.userAgent.indexOf('Adr') > -1) {//安卓手机
              window.android.showWebView()
              if(!that.isHasTxt){
                window.android.hideButton()
              }

            } else {
              // console.log(share)
            }
          }
      }
    })
  },
  created() {
    fitScreen()
    if(Request.share){
      wxShare(wx,this.wxTitle,this.wxImgUrl,this.desc)
      playHack()
    }
    var that = this;
    visProp(function(){
      $('#audio').get(0).pause()
      that.isPlay = 'pause';
    })
    $(window).one('touchstart', function (e) {
      if( $('#audio').get(0).paused && that.isPlay != 'play'){
        $('#audio').get(0).play();
      }
    })
    $(window).resize(function(){
      that.musicWidth = $(window).width()-375
      console.log(that.musicWidth)
    })
    hybrid.resetTextSize = this.resetTextSize
    hybrid.clickMusic = this.clickMusic
  },
  filters: {
    formatDate(time) {
      var date = new Date(time);
      return formatDate(date,'yyyy-MM-dd');
    }
  },
  methods:{
    musicFn(){
      if($('#audio').get(0).paused){
        $('#audio').get(0).play()
        this.isPlay = 'play';
      }else{
        $('#audio').get(0).pause()
        this.isPlay = 'pause';
      }
  },
    userMesPos(list,that){
      list.forEach((item)=> {
        if (item.propertyType == 5) {
          var left = item.propertyLeft,
            top = item.propertyTop;
          that.styleObject.left = left / 2;
          that.styleObject.top = top / 2;
        }
      })
    },
    getFont(fontLink,name,that){
      var name = name;
      $('head').append('<style id="style"></style>')
        //获取字体
        if(fontLink){
          $('#style').html('@font-face{font-family:"'+name+'";src:url('+fontLink+');}');
         var font = new FontFaceObserver(name);
          font.load(null,8000).then(function() {
            that.myfont=name
            console.log('字体加载成功')
          })
        }
    },
    show(index){
      this.$refs.preview.show(index)
    },
    toUserPage(userId){
        if(Request.share){
          location.href='./userPage.html?userId='+userId
        }
    },
    formatTxt(txt){
      return formatTxt(txt)
    },
    resetTextSize(num){
      resetFontSize(num,$('.text'))
    },
    clickMusic(ind){
        if(ind==1){
          $('#audio').get(0).play()
         this.isPlay='play'
        }else if(ind==0){
          $('#audio').get(0).pause()
          this.isPlay='pause'
        } else{
          if($('#audio').get(0).paused){
            $('#audio').get(0).pause()
            this.isPlay='pause'
          }else{
            $('#audio').get(0).play()
            this.isPlay='play'
          }
        }
      console.log(this.isPlay)
    }

  },
  components:{ preview,download,recommend }
}

</script>
<style lang="stylus" rel="stylesheet/stylus">
@import "../../common/style.css";
body,html
  position relative
  z-index -2
  #app
    width 375px
    min-height:100%
    margin 0 auto
    position relative
    z-index -2;
    .blankBox
       width:100%
       background url('../../assets/detail_bg.jpg') no-repeat center top
       background-size cover
       padding-top 120px
       .blankImg
          width 266px
          margin:0 auto
    .longModule
        width 375px
        margin 0 auto
        position relative
        z-index -2;
        background #fff
        min-height 100%
        background:repeat-y center top
        background-size 100% auto
      .userMes
          div
            margin:0 5px;
            line-height:25px;
          .userImg
            img
              width:25px;
              height:25px;
              -webkit-border-radius:50%;
              -moz-border-radius:50%;
              border-radius:50%;
      .context
       .part
          border-radius:6px;
          padding:10px;
          box-sizing: border-box;
          background:repeat-y center top
          background-size:100% auto;
         .text_part
            padding-bottom:7px;
            line-height:1.5em;
            word-wrap:break-word;
            overflow:hidden;
            text-align:justify;
          img
            max-width:100%
            padding-bottom:7px;
            margin:0 auto;
          img[lazy=loading]
            width:auto
            animation: bganim 2s linear 0s infinite;
          @keyframes bganim
            from { transform:rotate(0deg) }
            to { transform:rotate(360deg) }

      header
        width:100%;
     .bgTop
        z-index:-1;
    .letterModule
      padding 10px 0
      .moduleBox
        .moduleContent
          padding 5px 20px
          overflow hidden
  .saveImg{
    display:none
    position:fixed;
    bottom:0;
    left:0;
    width:100%;
    height:48px;
    padding-top:10px;
    z-index:2000;
    background:#000 url('../../assets/saveImg.png') no-repeat center center;
    background-size:150px auto
  }
  #music
    position:fixed;
    right:5px;
    top:10px;
    width:40px;
    height:40px;
    z-index:100;
    .music
      position:absolute;
      width:40px;
      height:40px;
      background:url('../../assets/playOrPause.png') no-repeat 0 0;
      background-size:auto 100%;
      &.play
        -webkit-animation:move 2s steps(360) infinite;
        animation: move 2s steps(360) infinite;
        -moz-animation: move 2s steps(360) infinite;
      &.pause
        background:url('../../assets/playOrPause.png') no-repeat -40px 0;
        background-size:auto 100%;

    @-webkit-keyframes move
      0%{-webkit-transform:rotate(0deg)}
      50%{-webkit-transform:rotate(180deg)}
      100%{-webkit-transform:rotate(360deg)}

    @keyframes move
      0%{transform:rotate(0deg)}
      50%{transform:rotate(180deg)}
      100%{transform:rotate(360deg)}

    @-moz-keyframes move
      0%{-moz-transform:rotate(0deg)}
      50%{-moz-transform:rotate(180deg)}
      100%{-moz-transform:rotate(360deg)}

</style>
