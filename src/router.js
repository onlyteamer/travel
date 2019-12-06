import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

const routes = [
  {
    path: '*',
    redirect: '/register'
  },
  {
    name: 'register',
    component: () => import('./view/register/register.vue'),
    meta: {
      title: '注册'
    }
  },
    {
        name: 'user',
        component: () => import('./view/user/user.vue'),
        meta: {
            title: '个人中心'
        }
    },
    {
        name: 'ownerCertification',
        component: () => import('./view/user/ownerCertification.vue'),
        meta: {
            title: '车主认证'
        }
    },
    {
        name: 'ownerCertificationRemind',
        component: () => import('./view/user/ownerCertificationRemind.vue'),
        meta: {
            title: '车辆认证提示'
        }
    },
    {
        name: 'addCar',
        component: () => import('./view/user/addCar.vue'),
        meta: {
            title: '车辆信息添加'
        }
    },

    {
        name: 'carIndex',
        component: () => import('./view/carpool/carIndex.vue'),
        meta: {
            title: '共享拼车'
        }
    },
    {
        name: 'pushStroke',
        component: () => import('./view/carpool/pushStroke.vue'),
        meta: {
            title: '发布行程'
        }
    },
    {
        name: 'updateStroke',
        component: () => import('./view/carpool/updateStroke.vue'),
        meta: {
            title: '修改行程'
        }
    },
    {
        name: 'reserve',
        component: () => import('./view/carpool/reserve.vue'),
        meta: {
            title: '预约'
        }
    },
    {
        name: 'declare',
        component: () => import('./view/carpool/declare.vue'),
        meta: {
            title: '车辆预约'
        }
    },
    {
        name: 'carLine',
        component: () => import('./view/carpool/carLine.vue'),
        meta: {
            title: '拼车列表'
        }
    },
    {
        name: 'lineDetails',
        component: () => import('./view/carpool/lineDetails.vue'),
        meta: {
            title: '拼车详情'
        }
    },

  // {
  //   name: 'cart',
  //   component: () => import('./view/cart'),
  //   meta: {
  //     title: '购物车'
  //   }
  // },
  // {
  //   name: 'goods',
  //   component: () => import('./view/goods'),
  //   meta: {
  //     title: '商品详情'
  //   }
  // }
];

// add route path
routes.forEach(route => {
  route.path = route.path || '/' + (route.name || '');
});

const router = new Router({ routes });

router.beforeEach((to, from, next) => {
  const title = to.meta && to.meta.title;
  if (title) {
    document.title = title;
  }
  next();
});

export {
  router
};
