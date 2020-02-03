import Vue from 'vue';
import App from './App';
import { router } from './router';
import AMap from 'vue-amap';


import { Lazyload,Toast } from 'vant';

Vue.use(Toast);
Vue.use(Lazyload);
Vue.use(AMap);

Vue.prototype.$timer = [];

Vue.prototype.updateDriverPosition = function (tripId){
  App.methods.updateDriverPosition(tripId);
};

Toast.setDefaultOptions({ duration: 3000 ,className:'my-toast'});
// 初始化vue-amap
AMap.initAMapApiLoader({
  // 高德的key
  key: 'e4c0d7465fc1b862129af75632982eba',
  // 插件集合 （插件按需引入）
  plugin: ['AMap.Scale', 'AMap.OverView', 'AMap.ToolBar', 'AMap.PolyEditor']
});

new Vue({
  router,
  el: '#app',
  render: h => h(App)
});
