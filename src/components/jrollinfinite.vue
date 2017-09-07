<template>

</template>

<script>
  import 'jroll'
//  import 'jroll-vue-infinite'
  import { Request,url } from "../common/all.js"

  export default {
    // return {
    name:'jrollInfinite',
    template: '<div><div><slot></slot><div class="jroll-infinite-tip" v-html="tip"></div></div></div>',
    data() {
      return {
        options:{
          tip: '正在加载...',
          bottomed: function () {
            var _this = this
            $.ajax({
              url: url+'/api/run/getMyHomePage',
              type: 'post',
              data: {userId: Request.userId, pageNum: 1, pageSize: 6},
              dataType: 'jsonp',
              jsonpCallBack: 'successCallBack2',
              success: function (data) {
              console.log(_this)
                _this.$emit('data',data.resultData)
                _this.$emit('list',data.resultData.list)
                _this.options.total = data.resultData.pages;
                // 成功后执行该方法
                _this.success()
              },
              error: function () {
                // 失败后执行该方法，会变更tip，显示错误提示
                _this.error()
              }
            })
          },
          total:'',
          updated: function () {}
        },
        jrollOptions:{
          scrollBarY: true
        },
        total: 99,
        page:  0,
        tip: '正在加载中...',
      }
    },
    mounted: function () {
      var _this = this
      _this.jroll = new JRoll('.content', _this.jrollOptions || {})
      console.log(this)
      if (_this.options.pulldown) {
        _this.options.pulldown.refresh = function (complete) {
          _this.page = 0
          _this.options.bottomed.call(_this, complete)
        }
        if (typeof me.jroll.pulldown === 'function') {
          _this.jroll.pulldown(_this.options.pulldown)
        } else {
          console.error('If you want to open the `pulldown` options, you must load `jroll-pulldown.js` first')
        }
      }
      _this.jroll.on('scrollEnd', function () {
        if (this.y <= this.maxScrollY + _this.jroll.scroller.querySelector('.jroll-infinite-tip').offsetHeight &&
          typeof _this.options.bottomed === 'function' && _this.page < _this.total) {
          _this.tip = _this.options.tip || '正在加载中...'
          _this.options.bottomed.call(_this)
        }
      })
      if (typeof _this.options.bottomed === 'function') _this.options.bottomed.call(_this)
    },
    updated: function () {
      if (this.options && typeof this.options.updated === 'function') this.options.updated.call(this)
      this.jroll.refresh()
    },
    methods: {
      success() {
          console.log(this.page)
        this.page++
      },
      error() {
        this.tip = this.options.errorTip || '加载失败，上拉重试'
      }
    },
    watch: {
      page(p) {
        if (p === this.total) {
          this.tip = this.options.completeTip || '已全部加载完成'
        }
      }
    }
    // }
  }

</script>

<style lang="stylus" rel="stylesheet/stylus">

</style>
