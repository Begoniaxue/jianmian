import Vue from 'vue'
import downPage from './down'


Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  template: '<downPage/>',
  components: { downPage }
})
