<template>
  <div id="app">
    <div v-if="data.templateClass=='pt'" class="longModule" :style="{ background:'url('+data.templateBaseInfo.backBottomUrl+') repeat-y center top',backgroundSize:'100% auto'}">
      <div class="absolute bgTop"><img :src="data.templateBaseInfo.backTopUrl" alt=""></div>
      <div class="mask"></div>
      <header class="absolute" v-if="data.templateTitle"><img :src="data.templateTitle.titleThum" alt="" class="banner"></header>
      <div class="userMes absolute" v-if="styleObject.left" :style="{ left:styleObject.left+'px',top:styleObject.top+'px' }">
        <div class="fl userImg">
         <img src="../../assets/userImg.png" alt="">
        </div>
        <div v-for="property in data.propertiesList" v-if="property.propertyType==2" class="fl text_center textFont2" :style="{ fontFamily:myfonts[0],color:property.propertyColor,fontSize:property.fontSize>2?property.fontSize/2+'px':fontSize[property.fontSize]}">见字如面·著</div>
        <div v-for="property in data.propertiesList" v-if="property.propertyType==1" class="fl text_center textFont1" :style="{fontFamily:myfonts[1],color:property.propertyColor,fontSize:property.fontSize>2?property.fontSize/2+'px':fontSize[property.fontSize]}">{{data.createDate | formatDate}}</div>
      </div>
      <div v-for="property in data.propertiesList" v-if="property.propertyType==6"  class="context textFont6" :style="{fontFamily:myfonts[2],color:property.propertyColor,fontSize:property.fontSize>2?property.fontSize/2+'px':fontSize[property.fontSize],paddingTop:property.propertyTop/2+'px'}">
        <div class="part" :style="{ background:'url('+data.templateBaseInfo.moduleBackUrl+') repeat-y center top',backgroundSize:'100% auto',fontSize:property.fontSize>2?property.fontSize/2+'px':fontSize[property.fontSize],color:property.propertyColor,margin:'0 '+property.propertyLeft/2+'px'}">
            <div v-for="(list,index) in data.copyList" >
              <img v-if="list.copyIcon" class="previewer-demo-img" v-lazy="list.copyIcon" alt="" @click="show(list.flag)">
              <p v-if="list.copyName" class="text_part text" v-html="formatTxt(list.copyName)"></p>
            </div>
        </div>
        <div class="bgDown"><img :src="data.templateBaseInfo.backDownUrl" alt=""></div>
      </div>
    </div>

    <div v-if="data.templateClass=='sx'" class="longModule letterModule" :style="{ background:'url('+data.templateBaseInfo.backBottomUrl+') repeat-y center top',backgroundSize:'100% auto'}">
      <div class="mask"></div>
      <div class="moduleBox">
        <img :src="data.templateBaseInfo.moduleTopUrl" alt="" class="moduleTop">
        <div class="moduleContent" :style="{background:'url('+data.templateBaseInfo.moduleBottomUrl+') repeat-y center top',backgroundSize:'100% auto'}">
          <div class="userMes" v-for="property in data.letterPropertiesList" v-if="property.propertyType==0" :style="{ fontFamily:myfont,color:property.textColor,fontSize:property.fontSize/2+'px',
          textAlign:align[property.alignType],fontWeight:fontWeight[property.isBold],
          fontStyle:fontStyle[property.isItalic],textDecoration:textDecoration[property.isUnderline]}">{{property.textInfo}}</div>
          <div v-for="property in data.letterPropertiesList" v-if="property.propertyType==1"  class="context part" :style="{fontFamily:myfont,color:property.textColor,fontSize:property.fontSize/2+'px',
          textAlign:align[property.alignType],fontWeight:fontWeight[property.isBold],
          fontStyle:fontStyle[property.isItalic],textDecoration:textDecoration[property.isUnderline]}">
            <div v-for="(list,index) in data.copyList" >
              <img v-if="list.copyIcon" class="previewer-demo-img" v-lazy="list.copyIcon" alt="" @click="show(list.flag)">
              <p v-if="list.copyName" class="text_part text" v-html="formatTxt(list.copyName)"></p>
            </div>
          </div>
          <div class="inscribe fr" v-for="property in data.letterPropertiesList" v-if="property.propertyType==2" :style="{ fontFamily:myfont,color:property.textColor,fontSize:property.fontSize/2+'px',
           textAlign:align[property.alignType],fontWeight:fontWeight[property.isBold],
          fontStyle:fontStyle[property.isItalic],textDecoration:textDecoration[property.isUnderline]}">{{property.textInfo}}</div>
        </div>
        <img :src="data.templateBaseInfo.moduleDownUrl" alt="" class="moduleDown">
      </div>
    </div>
    <preview :imgs="list" ref="preview"></preview>
    <div id="music" v-on:click="musicFn">
      <div class="music"  :class="isPlay"><audio id="audio" :src="data.musicLink" style="display: none" preload autoplay loop></audio></div>
    </div>
  </div>
</template>

<script>
  import FontFaceObserver from 'fontfaceobserver'
  import { Request,url,fitScreen } from "../../common/all.js"
  import { formatDate,visProp,formatTxt } from "../../common/js.js"
  import preview from "../../components/preview"
  import { hybrid } from "../../common/app.js"
export default {
  name: 'app',
  data() {
    return {
      data:{},
      isPlay:'play',
      styleObject:{},
      myfonts:[],
      myfont:'',
      list:[],
      fontSize:['23px','23px','23px'],
      align:['justify','right','center'],
      fontWeight:['normal','blod'],
      fontStyle:['normal','italic'],
      textDecoration:['none','underline']
    }
  },
  beforeCreate() {
    var that = this;
    $.ajax({
      url: url+'/V1.2/api/template/getTemplateById',//测试环境
//      url:'http://api.jianmian.myfont.me/V1.2/api/template/getTemplateById',//线上
      type: 'post',
      data: {
        'templateId':Request.templateId,
        'templateType':Request.templateType
      },
      dataType: "jsonp",
      jsonpCallback: "successCallback",
      success: function (data) {
          let result =data.resultData;
          let count=0;
          console.log(result)
        if (data.code = 1000 && data.resultData) {
          if(result.copyList){
            result.copyList.forEach((item)=>{
              if(item.copyIcon){
                item.flag=count;
                count++;
                that.list.push({'src': item.copyIcon})
              }
            })
          }
          that.data =result;
          var list;
          if(result.templateClass=='pt'){
            list =  result.propertiesList;
            that.getAllFont(list,that)
          }else if(result.templateClass=='sx'){
            list = result.letterPropertiesList
            that.getFont(result.templateBaseInfo.fontLink,that)
          }
        } else if(!data.resultData){
          that.$vux.toast.text("当前模板暂无数据！", 'center')
          }else{
          that.$vux.toast.text("出错了"+data.code+":"+data.msg, 'center')
          }
      },
      complete:function(){
        if (navigator.userAgent.indexOf('Android') > -1 || navigator.userAgent.indexOf('Adr') > -1) {//安卓手机
          window.android.showWebView()
        } else {
          // console.log(share)
        }
      }
    })
  },
  created() {
    fitScreen()
    var that = this;
    visProp(function(){
      $('#audio').get(0).pause()
      that.isPlay = 'pause';
    })
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
      getAllFont(list,that){
      var name = [],
        fonts = [];
      $('head').append('<style id="style"></style>')
        list.forEach((item,index)=>{
          //用户信息的位置
          if(item.propertyType == 5){
            var left = item.propertyLeft,
              top = item.propertyTop;
            that.styleObject.left = left/2;
            that.styleObject.top = top/2;
          }
          //获取字体
          if(item.fontLink) {
            var arr = item.fontLink.split('/');
            name[index] = arr[arr.length - 1].split('.')[0];
            $('#style').append('@font-face{font-family:"' + name[index] + '";src:url(' + item.fontLink + ');}');
            fonts[index] = new FontFaceObserver(name[index]);
            var fontName = name[index]
            fonts[index].load(null, 8000).then(function () {
              that.myfonts.push(fontName)
              console.log('字体加载成功')
            })
          }
        })
    },
      getFont(fontLink,that){
        $('head').append('<style id="style"></style>')
        //获取字体
        if(fontLink){
          var arr = fontLink.split('/');
          var name = arr[arr.length - 1].split('.')[0];
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
      formatTxt(txt){
        return formatTxt(txt)
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
      }
  },
  components:{ preview }
}

</script>
<style lang="stylus" rel="stylesheet/stylus">
@import "../../common/style.css";
body,html
  position:relative;
  z-index:-2;
  #app
    width 375px
    min-height:100%
    background url('../../assets/detail_bg.jpg') no-repeat center top
    background-size cover
    margin 0 auto
    position relative
    z-index -2;
    .longModule
        width:375px;
        margin:0 auto;
        position:relative;
        z-index:-2;
        background:#fff;
        min-height:100%;
        background-size:100% auto
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
     .part
        -webkit-border-radius:6px;
        -moz-border-radius:6px;
        border-radius:6px;
        padding:10px;
        min-height:332px;
        box-sizing: border-box;
        background-size:100% auto;
       img
         margin: 0 auto
         max-width:100%
       img[lazy=loading]
         width:auto
         animation: bganim 2s linear 0s infinite;
       @keyframes bganim
         from { transform:rotate(0deg) }
         to { transform:rotate(360deg) }
       .text_part
          padding:7px 0;
          line-height:1.5em;
          word-wrap:break-word;
          overflow:hidden;
          text-align:justify;
      header
        width:100%;
     .bgTop
        z-index:-1;
     .mask
      position:fixed;
      width:376px;/*加渐变后少一像素,在这里补上*/
      height:129px;
      background: -webkit-linear-gradient(rgba(2,2,2,0.5), rgba(85,85,85,0));
      background: -moz-linear-gradient(rgba(2,2,2,0.5), rgba(85,85,85,0));
      z-index:99;
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
