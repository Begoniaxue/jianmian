<template>
  <div class="download">
    <a href="./downPage.html"><ul>
      <li class="logo"><img src="../assets/logo.png" alt=""></li>
      <li class="txt"><p>见字如面</p><p>随时随地与大家分享你的多样情怀</p></li>
      <li class="btn"><button>下载APP</button></li>
    </ul></a>
  </div>
</template>

<script>
export default {
  name: 'download',
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>

  .download{
    height:58px;
    width:376px;
    background:#2c2c2c;
    -webkit-box-shadow: 0px -1px 8px #666;
    -moz-box-shadow:0px -1px 8px #666;;
    box-shadow:0px -1px 8px #666;
    position:fixed;
    bottom:0;
    left:50%;
    margin-left:-188px;
    z-index:99;
  }
  .download ul{
    height:58px;
    padding:12px 8px;
  }
  .download li{
    float: left;
  }
  .download .logo{
    height:36px;
    width:36px;
    margin-right:10px;
  }
  .download .logo img{
    height:100%;
  }
  .download .txt p:nth-child(1){
    font-size: 16px;
    color: #FAFAFA;
    letter-spacing: 1px;
  }
  .download .txt p:nth-child(2){
    font-size: 12px;
    color: #FAFAFA;
    letter-spacing: 0.75px;
  }
  .download .btn{
    margin-left:32px;
    height: 27px;
    padding-top:2px;
  }
  .download .btn button{
    padding:0 10px;
    height:100%;
    background:none;
    border:none;
    background:#f6d11c;
    text-align: center;
    line-height:27px;
    font-size:14px;
    -webkit-border-radius:3px;
    -moz-border-radius:3px;
    border-radius:3px;
    -webkit-box-shadow: 0px 2px 6px 2px #544811;
    -moz-box-shadow:0px 2px 6px 2px #544811;
    box-shadow: 0px 2px 6px 2px #544811;
  }</style>
