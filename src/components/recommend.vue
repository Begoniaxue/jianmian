<template>
  <div v-if="data.length>0">
    <div style="height:10px"></div>
    <div class="recommend" :style="{background:'url('+bgImg+') repeat-y center top',backgroundSize:'100% auto'}">
      <div class="recMask">
        <h2 class="recommendBt">为您推荐</h2>
        <ul class="list">
          <li v-for="list in data" @click="toPage(list.essayId,list.essayType)">
            <img v-if="list.essayUrl" v-lazy="lazyloadUrl(list.essayUrl)" alt="" >
            <img v-else v-lazy="lazyloadUrl(list.essayHomeUrl)" alt="">
            <div class="content">
              <h5 class="essayBt">{{list.essayTitle}}</h5>
              <p></p>
            </div>
          </li>
        </ul>
        <div class="bottom"><p class="line"></p><p class="tip">到底了</p><p class="line"></p></div>
      </div>

    </div>
  </div>
</template>

<script>
 import { Request,url} from "../common/all.js"
export default{
    name:'recommend',
    data(){
      return{
        data:{},
      }
    },
    props:{
       bgImg:{
           type:String
       }
    },
    mounted(){
        var _this = this;
        $.ajax({
          url:url+'/V1.2/api/er/getEssayRecommend',
          type:'post',
          data:{essayId:Request.essayId},
          dataType: "jsonp",
          jsonpCallback: "successCallback3",
          success:function(data){
              console.log(data)
            _this.data = data.resultData
          }
        })
    },
  methods:{
    toPage(id,type){
        if(Request.share){
          location.href="./share.html?essayType=LE&essayId="+id+"&share=1"
        }else{
          if (navigator.userAgent.indexOf('Android') > -1 || navigator.userAgent.indexOf('Adr') > -1) {//安卓手机
              window.android.nextArticle(id,'LE')
          } else {
            // console.log(share)
          }
        }

    },
    lazyloadUrl(url){
        return{
            src:url,
            error: require('../assets/defaulImg.png'),//这个是请求失败后显示的图片
            loading: require('../assets/defaulImg.png'),//这个是加载的loading过渡效果
        }
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
@font-face
  font-family:"normal"
  src:url("../fonts/FZZHUNYSJW.ttf")
  font-stretch:condensed
  font-style: normal
.recommend
  font-family normal
  background #ccc
  .recMask
    width 100%
    background  rgba(242,242,242,0.80);
    .recommendBt
      line-height 45px
      padding-left 10px
      color #BA9A02
      font-size 16px
      border-bottom 1px solid #dcdcdc
      margin-bottom 12px
    .list
      padding 0 10px
      li
        margin-bottom 15px
        height 80px
        width 100%
        display flex
        img
          width 150px
          max-width:150px
        .content
          margin-left 8px
          flex 1
          width 0
          .essayBt
            color #505050
            width 100%
            display  flex
            align-items  center
            height 100%
            /*overflow hidden*/
            /*text-overflow ellipsis*/
            /*white-space nowrap*/
            font-size 16px
    .bottom
      display flex
      width 100%
      padding 8px 0 10px
      .line
        flex 1
        position relative
        top -7px
        border-bottom 1px solid #dcdcdc
        margin 0 30px
      .tip
        font-size 14px
        color #999999
        text-align center
        padding 0 14px
</style>
