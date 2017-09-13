<template>
  <div class="preview">
    <div v-transfer-dom>
      <div class="saveImg" @click="saveImgFn">保存图片</div>
      <previewer :list="imgs" ref="previewer" :options="options" @on-close="closeImg" @on-afterChange="changeImg"></previewer>
    </div>
  </div>
</template>

<script>
  import { Previewer, TransferDom } from 'vux'
  import{ Request } from "../common/all.js"
  export default {
    name: 'preview',
    data() {
        return{
          imgUrl:null,
          options: {
            loop: false,
            bgOpacity: 0.9,
            tapToClose: true,
            clickToCloseNonZoomable: false,
            verticalDragRange: 1,
            allowPanToNext: true,
            getThumbBoundsFn (index) {
              let thumbnail = document.querySelectorAll('.previewer-demo-img')[index]
              let pageYScroll = window.pageYOffset || document.documentElement.scrollTop
              let rect = thumbnail.getBoundingClientRect()

              return {x: rect.left, y: rect.top + pageYScroll, w: rect.width}
            }
          }
        }

    },
    props:{
        imgs:{
          type:Array
        }
    },
    directives: {
      TransferDom
    },
    components: {
      Previewer
    },
    methods: {
      closeImg(){
        $('.saveImg').fadeOut(300)
        if (navigator.userAgent.indexOf('Android') > -1 || navigator.userAgent.indexOf('Adr') > -1) {//安卓手机
          window.android.showAndHide(1)
        } else {

        }
      },
      show(index){
        this.imgUrl = $('.previewer-demo-img').eq(index).attr('src');
        this.complete(index+1,$('.previewer-demo-img').length)
        this.$refs.previewer.show(index)
        if(!Request.share){
          if (navigator.userAgent.indexOf('Android') > -1 || navigator.userAgent.indexOf('Adr') > -1) {//安卓手机
            window.android.showAndHide(0)
          } else {

          }
          $('.saveImg').fadeIn()
        }
      },
      changeImg(currItem){
        this.imgUrl = currItem.msrc;
        let curIndex = $('.pswp__counter').html().split('/')[0];
        let allIndex = $('.pswp__counter').html().split('/')[1];
        this.complete(curIndex, allIndex)
      },
      complete(cur, all,item){
        if (Number(cur) != 1) {
          $('.pswp__ui .pswp__button--arrow--left').css('visibility', 'visible');
        } else {
          $('.pswp__ui .pswp__button--arrow--left').css('visibility', 'hidden');
        }
        if (Number(cur) == Number(all)) {
          $('.pswp__ui .pswp__button--arrow--right').css('visibility', 'hidden');
        } else {
          $('.pswp__ui .pswp__button--arrow--right').css('visibility', 'visible');
        }
      },
      saveImgFn(){
        if (navigator.userAgent.indexOf('Android') > -1 || navigator.userAgent.indexOf('Adr') > -1) {//安卓手机
          window.android.saveImg(this.imgUrl)
        }else{
          console.log(this.imgUrl)
        }
      }
    }
  }
</script>
<style lang="stylus" rel="stylesheet/stylus">
  .pswp__scroll-wrap
    .pswp__ui
      .pswp__top-bar
        background:none
        .pswp__counter
          opacity:0
        .pswp__button--fs
          display:none
        .pswp__button--zoom
          display:none
        .pswp__button--close
          float:left
      .pswp__button--arrow--left
        background:none
        opacity:1
        &:before
          width:30px
          height:60px
          background:url('../assets/btn-pre.png') no-repeat center center
          background-size:100% 100%
      .pswp__button--arrow--right
        background:none
        opacity:1;
        visibility:visible
        &:before
          width:30px
          height:60px
          background:url('../assets/btn-next.png') no-repeat center center
          background-size:100% 100%
.pswp .pswp__img
  max-width:100%
</style>
