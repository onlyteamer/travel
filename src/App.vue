<template>
  <div id="app">
    <router-view />
    <remote-js src="http://webapi.amap.com/maps?v=1.4.5&key=4b5f2cf2cba25200cc6b68c398468899&&plugin=AMap.ToolBar,AMap.Driving,AMap.Autocomplete,AMap.PlaceSearch"></remote-js>
    <remote-js src="https://a.amap.com/jsapi_demos/static/demo-center/js/demoutils.js"></remote-js>
    <!--<remote-js src="https://cache.amap.com/lbs/static/addToolbar.js"></remote-js>-->

  </div>
</template>

<script>

    export default {
        components:{
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
</style>
