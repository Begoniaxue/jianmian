// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import { AlertPlugin, ToastPlugin } from 'vux'
import VueLazyload from 'vue-lazyload'

Vue.use(VueLazyload, {
  error: require('../../assets/loading.png'),//这个是请求失败后显示的图片
  loading: require('../../assets/loading.png'),//这个是加载的loading过渡效果
  try: 4, // 这个是加载图片数量,
  adapter: {
    loaded ({el, naturalHeight, naturalWidth, $parent, src, loading, error, Init}) {
      // do something here
      $(el).width(naturalWidth/2)
    },
  }
})

Vue.use(AlertPlugin)
Vue.use(ToastPlugin)

// import router from '../../router/index'

Vue.config.productionTip = false

/* eslint-disable no-new */

new Vue({
  el: '#app',
  // router,
  template: '<App/>',
  components: { App }
})

