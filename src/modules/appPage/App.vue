<template>
  <div id="app">
    <!--书信模板-->
    <div v-if="data.longTemplate" class="longModule letterModule" :style="{ background:'url('+data.longTemplate.templateBaseInfo.backBottomUrl+') repeat-y center top',backgroundSize:'100% auto'}">
      <div class="mask"></div>
      <div class="moduleBox">
        <img :src="data.longTemplate.templateBaseInfo.moduleTopUrl" alt="" class="moduleTop">
        <div class="moduleContent" :style="{background:'url('+data.longTemplate.templateBaseInfo.moduleBottomUrl+') repeat-y center top',backgroundSize:'100% auto'}">
          <div class="userMes" v-for="property in data.longTemplate.letterPropertiesList" v-if="property.propertyType==0" :style="{ fontFamily:myfont,color:property.textColor,fontSize:property.fontSize/2+'px',
          textAlign:align[property.alignType],fontWeight:fontWeight[property.isBold],
          fontStyle:fontStyle[property.isItalic],textDecoration:textDecoration[property.isUnderline]}">{{property.textInfo}}</div>
          <div v-for="property in data.longTemplate.letterPropertiesList" v-if="property.propertyType==1"  class="context part" :style="{fontFamily:myfont,color:property.textColor,fontSize:property.fontSize/2+'px',
          textAlign:align[property.alignType],fontWeight:fontWeight[property.isBold],
          fontStyle:fontStyle[property.isItalic],textDecoration:textDecoration[property.isUnderline]}">
            <div v-for="list in data.essayCopyList" v-if="list.copyPosition==0">
              <img v-if="list.copyUrl"  v-show="list.imgLoad" class="previewer-demo-img" :src="list.copyUrl" alt="" @click="show(list.flag)" :style="{width:list.width+'px'}">
              <p v-if="list.copyInfo" class="text_part"  v-html="formatTxt(list.copyInfo)" :style="{textAlign:align[list.alignType],fontSize:fontSize[property.fontSize],fontWeight:fontWeight[list.isBold],fontStyle:fontStyle[list.isItalic],textDecoration:textDecoration[list.isUnderline]}"></p>
            </div>
            <div v-for="list in data.essayCopyList" v-if="list.copyPosition==1">
              <img v-if="list.copyUrl" v-show="list.imgLoad" class="previewer-demo-img" :src="list.copyUrl" alt="" @click="show(list.flag)" :style="{width:list.width+'px'}">
              <p v-if="list.copyInfo" class="text_part" v-html="formatTxt(list.copyInfo)" :style="{textAlign:align[list.alignType],fontSize:fontSize[property.fontSize],fontWeight:fontWeight[list.isBold],fontStyle:fontStyle[list.isItalic],textDecoration:textDecoration[list.isUnderline]}"></p>
            </div>
          </div>
          <div class="inscribe fr" v-for="property in data.longTemplate.letterPropertiesList" v-if="property.propertyType==2" :style="{ fontFamily:myfont,color:property.textColor,fontSize:property.fontSize/2+'px',
           textAlign:align[property.alignType],fontWeight:fontWeight[property.isBold],
          fontStyle:fontStyle[property.isItalic],textDecoration:textDecoration[property.isUnderline]}">{{property.textInfo}}</div>
        </div>
        <img :src="data.longTemplate.templateBaseInfo.moduleDownUrl" alt="" class="moduleDown">
      </div>
    </div>
  </div>
</template>

<script>
  import FontFaceObserver from 'fontfaceobserver'
  import { fitScreen } from "../../common/all.js"
  import { formatDate,formatTxt } from "../../common/js.js"
  import { hybrid } from "../../common/app.js"
export default {
  name: 'app',
  data() {
    return {
      data:{},
      myfont:'',
      fontSize:['19px','19px','19px'],
      align:['justify','right','center'],
      fontWeight:['normal','blod'],
      fontStyle:['normal','italic'],
      textDecoration:['none','underline'],
    }
  },
  beforeCreate() {
  },
  created() {
    fitScreen()
    hybrid.sucFn = this.sucFn
  },
  filters: {
    formatDate(time) {
      var date = new Date(time);
      return formatDate(date,'yyyy-mm-dd');
    }
  },
  methods:{
    getFont(fontLink,name){
      var name = name;
      let that = this;
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
    formatTxt(txt){
      return formatTxt(txt)
    },
    sucFn(result){
      console.log(result)
      var img = [];
      result.essayCopyList.forEach((item,index)=>{
        item.imgLoad = false;
        if(item.copyUrl){
          img[index] = new Image();
          img[index].src=item.copyUrl
          if(img[index].complete){
            item.width = img[index].width/2
            item.imgLoad = true
          }else{
            img[index].onload = function(index){
              return function(){
                item.width = img[index].width/2
                item.imgLoad = true
              }
            }(index)
          }

        }
      })
      this.data =result;
      this.getFont(result.fontLink,result.fontName)
    }
  },
  components:{ }
}
</script>
<style lang="stylus" rel="stylesheet/stylus">
@import "../../common/style.css";
body,html
  position relative
  z-index -2
  #app
    width 375px
    height 100%
    background url('../../assets/detail_bg.jpg') no-repeat center top
    background-size cover
    margin 0 auto
    position relative
    z-index -2;
    overflow hidden
    overflow-y scroll
    -webkit-overflow-scrolling touch
    &::-webkit-scrollbar
     display:none
    .longModule
        width 375px
        margin 0 auto
        position relative
        z-index -2;
        background #fff
        min-height 100%
        background-size 100% auto
      .context
       .part
          -webkit-border-radius:6px;
          -moz-border-radius:6px;
          border-radius:6px;
          padding:10px;
          min-height:332px;
          box-sizing: border-box;
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
</style>
