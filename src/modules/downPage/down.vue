<template>
  <div id="app">
    <div class="mask"><img src="../../assets/yindao.png" alt=""></div>
    <div style="position:relative">
      <a href="http://download.xiezixiansheng.com/h5upload/apkdownload/Show_v1.0_2017-07-07_myfont.apk"><div style="width:46%;height:50px;position:absolute;left:27%;top:23.8%;"></div></a>
      <img style="width:100%;" src="../../assets/download_bg.jpg" alt="">
    </div>
  </div>

</template>

<script>
  export default {
      name:'downPage'
  }
</script>

<style>
  @import "../../common/style.css";
  .mask{
    position:fixed;
    top:0;
    left:0;
    display:none;
    z-index:10;
  }
  .mask img{
    width:100%;
  }
</style>
