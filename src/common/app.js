/**
 * Created by founder on 2017/8/17.
 */
// 发送到 window 对象上
var hybrid = {

}
window.Hybrid = hybrid
if (window.Vue) { // 自动绑定
  window.Vue.use(hybrid)
}

export { hybrid }
