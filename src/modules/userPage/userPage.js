// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import about from './about'
import VueLazyload from 'vue-lazyload'

Vue.use(VueLazyload, {
  error: require('../../assets/defaulImg.png'),//这个是请求失败后显示的图片
  loading: require('../../assets/defaulImg.png'),//这个是加载的loading过渡效果
  try: 1, // 这个是加载图片数量,
  adapter: {
    loaded ({el, naturalHeight, naturalWidth, $parent, src, loading, error, Init}) {
        $(el).addClass('shrink')
    },
  }
})

// import router from '../../router/index'

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  // router,
  template: '<about/>',
  components: { about }
})

