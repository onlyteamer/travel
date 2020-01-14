<template>
  <div id="app">
    <router-view />
    <!--<remote-css href="https://a.amap.com/jsapi_demos/static/demo-center/css/demo-center.css"></remote-css>-->
    <remote-js src="https://a.amap.com/jsapi_demos/static/demo-center/js/demoutils.js"></remote-js>
    <!--<remote-js src="https://cache.amap.com/lbs/static/addToolbar.js"></remote-js>-->
    <remote-js src="https://res.wx.qq.com/open/js/jweixin-1.4.0.js"></remote-js>
  </div>
</template>

<script>

    export default {
        components:{
            'remote-css': {
                render(createElement) {
                    return createElement('link', { attrs: { rel: 'stylesheet', href: this.href }});
                },
                props: {
                    href: { type: String, required: true },
                },
            },
            'remote-js': {
                render(createElement) {
                    return createElement('script', { attrs: { type: 'text/javascript', src: this.src }});
                },
                props: {
                    src: { type: String, required: true },
                },
            }
        }
    }
</script>

<style>
body {
  font-size: 16px;
  background-color: #f8f8f8;
  -webkit-font-smoothing: antialiased;
}
/*修改vant输入框字体大小为16px用来解决ios点击输入框页面放大的问题*/
.van-field__control{
  font-size: 16px;
}
</style>
