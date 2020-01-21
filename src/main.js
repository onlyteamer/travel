import Vue from 'vue';
import App from './App';
import { router } from './router';
import AMap from 'vue-amap';

import { Lazyload,Toast } from 'vant';

Vue.use(Toast);
Vue.use(Lazyload);
Vue.use(AMap);

Toast.setDefaultOptions({ duration: 5000 ,className:'my-toast'});
// 初始化vue-amap
AMap.initAMapApiLoader({
  // 高德的key
  key: '4b5f2cf2cba25200cc6b68c398468899',
  // 插件集合 （插件按需引入）
  plugin: ['AMap.Scale', 'AMap.OverView', 'AMap.ToolBar', 'AMap.PolyEditor']
});

new Vue({
  router,
  el: '#app',
  render: h => h(App)
});
