import Vue from 'vue';
import Router from 'vue-router';
import wx from 'weixin-js-sdk'

Vue.use(Router);

const routes = [
  {
    path: '*',
    redirect: '/carIndex'
  },
    {
        path: 'login',
        component: () => import('./view/login.vue'),
        meta: {
            title: '登录'
        }
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
        name: 'myLike',
        component: () => import('./view/user/myLike.vue'),
        meta: {
            title: '个人中心'
        }
    },
    {
        name: 'myFans',
        component: () => import('./view/user/myFans.vue'),
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
        name: 'agreement',
        component: () => import('./view/agreement/agreement.vue'),
        meta: {
            title: '协议'
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
        name: 'simpleAuth',
        component: () => import('./view/user/simpleAuth.vue'),
        meta: {
            title: '简单认证'
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
        name: 'wealth',
        component: () => import('./view/user/wealth.vue'),
        meta: {
            title: '充值提现'
        }
    },
    {
        name: 'wealthDetail',
        component: () => import('./view/user/wealthDetail.vue'),
        meta: {
            title: '账单明细'
        }
    },
    {
        name: 'busDriver',
        component: () => import('./view/user/busDriver.vue'),
        meta: {
            title: '班车司机'
        }
    },
    {
        name: 'integral',
        component: () => import('./view/user/integral.vue'),
        meta: {
            title: '我的积分'
        }
    },
    {
        name: 'coupon',
        component: () => import('./view/user/coupon.vue'),
        meta: {
            title: '优惠券'
        }
    },
    {
        name: 'passenger',
        component: () => import('./view/user/passenger.vue'),
        meta: {
            title: '乘车人管理'
        }
    },
    {
        name: 'passenger-edit',
        component: () => import('./view/user/passenger-edit.vue'),
        meta: {
            title: '乘车人编辑'
        }
    },
    {
        name: 'complain',
        component: () => import('./view/user/complain.vue'),
        meta: {
            title: '我的投诉'
        }
    },

    {
        name: 'setting',
        component: () => import('./view/user/setting.vue'),
        meta: {
            title: '我的资料'
        }
    },
    {
        name: 'vehicleManagement',
        component: () => import('./view/user/vehicleManagement.vue'),
        meta: {
            title: '车辆管理'
        }
    },
    {
        name: 'cancelTrip-passenger',
        component: () => import('./view/carpool/cancelTrip-passenger.vue'),
        meta: {
            title: '取消行程'
        }
    },
    {
        name: 'cancelTrip-driver',
        component: () => import('./view/carpool/cancelTrip-driver.vue'),
        meta: {
            title: '取消行程'
        }
    },
    {
        name: 'complain-passenger',
        component: () => import('./view/carpool/complain.vue'),
        meta: {
            title: '投诉'
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

    {
        name: 'myStroke',
        component: () => import('./view/carpool/myStroke.vue'),
        meta: {
            title: '我的行程'
        }
    },

    {
        name: 'blacklist',
        component: () => import('./view/carpool/blacklist.vue'),
        meta: {
            title: '黑名单'
        }
    },
    {
        name: 'passengerList',
        component: () => import('./view/carpool/passengerList.vue'),
        meta: {
            title: '乘客列表'
        }
    },
    {
        name: 'carFate',
        component: () => import('./view/carpool/carFate.vue'),
        meta: {
            title: '同车缘分'
        }
    },
    {
        name: 'passengerDetails',
        component: () => import('./view/carpool/passengerDetails.vue'),
        meta: {
            title: '乘客详情'
        }
    },
    {
        name: 'carOwnerDetails',
        component: () => import('./view/carpool/carOwnerDetails.vue'),
        meta: {
            title: '车主详情'
        }
    },

    {
        name: 'passengerAppraise',
        component: () => import('./view/carpool/passengerAppraise.vue'),
        meta: {
            title: '车主评价详情'
        }
    },
    {
        name: 'carOwnerAppraise',
        component: () => import('./view/carpool/carOwnerAppraise.vue'),
        meta: {
            title: '乘客评价详情'
        }
    },

    {
        name: 'otherOpt',
        component: () => import('./view/carpool/otherOpt.vue'),
        meta: {
            title: '其他操作'
        }
    },
    {
        name: 'carOwnPosition',
        component: () => import('./view/carpool/carOwnPosition.vue'),
        meta: {
            title: '车主位置'
        }
    },
    {
        name: 'checkTicket',
        component: () => import('./view/busTrip/checkTicket.vue'),
        meta: {
            title: '验票'
        }
    },
    {
        name: 'buyTicket',
        component: () => import('./view/busTrip/buyTicket.vue'),
        meta: {
            title: '购票'
        }
    },
    {
        name: 'ticketPayment',
        component: () => import('./view/busTrip/ticketPayment.vue'),
        meta: {
            title: '购票支付'
        }
    },
    {
        name: 'busIndex',
        component: () => import('./view/busTrip/busIndex.vue'),
        meta: {
            title: '绿色班车'
        }
    },
    {
        name: 'busList',
        component: () => import('./view/busTrip/busList.vue'),
        meta: {
            title: '班车列表'
        }
    },
    {
        name: 'resultList',
        component: () => import('./view/busTrip/resultList.vue'),
        meta: {
            title: '查询结果'
        }
    },
    {
        name: 'busDetail',
        component: () => import('./view/busTrip/busDetail.vue'),
        meta: {
            title: '班车详情'
        }
    },
    {
        name: 'ticketList',
        component: () => import('./view/busTrip/ticketList.vue'),
        meta: {
            title: '乘车验票待乘车'
        }
    },
    {
        name: 'lineList',
        component: () => import('./view/user/lineList.vue'),
        meta: {
            title: '切换线路'
        }
    },
    {
        name: 'carouselDetail',
        component: () => import('./view/agreement/carouselDetail.vue'),
        meta: {
            title: '轮播详情'
        }
    }
];

// add route path
routes.forEach(route => {
  route.path = route.path || '/' + (route.name || '');
});

const router = new Router({ routes });

router.beforeEach((to, from, next) => {
    let mark = to.fullPath.indexOf('code');
    if (mark !== -1) {
        if(wx){
            wx.closeWindow()
        }
    }

    const title = to.meta && to.meta.title;
  if (title) {
    document.title = title;
  }
  next();
});

export {
  router
};
